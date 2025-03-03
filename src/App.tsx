import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./sections/Home";
import Report from "./sections/Report";
import NoMatch from "./sections/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Transaction } from "./types/index";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { formatMonth } from "./utils/formating";
import { Schema } from "./validations/schema";

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  //console.log(currentMonth);
  //const formatedDate = format(currentMonth, "yyyy-MM"); //date-fnsで日付をフォーマット
  //console.log(formatedDate);

  //firestoreのエラーかどうかを判定する関数
  const isFireStoreError = (
    err: unknown
  ): err is { code: string; message: string } => {
    return typeof err === "object" && err !== null && "code" in err; //エラーはオブジェクトであり、nullでなく、codeプロパティを持っている
  };

  //初回レンダリング時に、firebaseからすべてのデータを取得
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        //console.log(querySnapshot.docs);

        const transactionsData = querySnapshot.docs.map((doc) => {
          // idとdataをオブジェクトとして取得
          //console.log(doc.id, " => ", doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction; //型アサーション
        });

        //console.log(transactionsData);
        setTransactions(transactionsData);
      } catch (err) {
        //error handling
        if (isFireStoreError(err)) {
          console.error("FireStoreのエラー：", err);
          console.error("FireStoreのエラーメッセージ：", err.message);
          console.error("FireStoreのエラーコード：", err.code);
        } else {
          console.error("一般的なエラー：", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  //今月のデータにのみを絞り込む
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });
  //console.log(monthlyTransactions);

  //取引データをfirebaseに保存する関数
  const handleSaveTransaction = async (transaction: Schema) => {
    //console.log(transaction);
    try {
      //firebaseにデータを保存
      const docRef = await addDoc(collection(db, "Transactions"), transaction);

      //stateを更新
      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
    } catch (err) {
      //error handling
      if (isFireStoreError(err)) {
        console.error("FireStoreのエラー：", err);
        console.error("FireStoreのエラーメッセージ：", err.message);
        console.error("FireStoreのエラーコード：", err.code);
      } else {
        console.error("一般的なエラー：", err);
      }
    }
  };

  //取引データをfirebaseから削除する関数
  const handleDeleteTransaction = async (transactonId: string) => {
    //firebaseからデータを削除
    try {
      await deleteDoc(doc(db, "Transactions", transactonId));
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.id !== transactonId
      );
      //console.log(filteredTransactions);
      console.log("Document successfully deleted!");

      setTransactions(filteredTransactions);
    } catch (err) {
      //error handling
      if (isFireStoreError(err)) {
        console.error("FireStoreのエラー：", err);
        console.error("FireStoreのエラーメッセージ：", err.message);
        console.error("FireStoreのエラーコード：", err.code);
      } else {
        console.error("一般的なエラー：", err);
      }
    }
  };

  //取引データをfirebaseで更新する関数
  const handleUpdateTransaction = async (
    transaction: Schema,
    transactionId: string
  ) => {
    try {
      //firebaseのデータを更新
      const docRef = doc(db, "Transactions", transactionId);

      await updateDoc(docRef, transaction);
      const updatedTransactions = transactions.map((t) =>
        t.id === transactionId ? { ...t, ...transaction } : t
      ) as Transaction[];
      //console.log(updatedTransactions);
      console.log("Document successfully updated!");
      setTransactions(updatedTransactions);
    } catch (err) {
      //error handling
      if (isFireStoreError(err)) {
        console.error("FireStoreのエラー：", err);
        console.error("FireStoreのエラーメッセージ：", err.message);
        console.error("FireStoreのエラーコード：", err.code);
      } else {
        console.error("一般的なエラー：", err);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onUpdateTransaction={handleUpdateTransaction}
                />
              }
            />
            <Route
              path="/report"
              element={
                <Report
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                  monthlyTransactions={monthlyTransactions}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="/*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
