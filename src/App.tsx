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
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";
import { format } from "date-fns";
//import { formatMonth } from "./utils/formating";

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(new Date(), "yyyy-MM")
  );
  //console.log(currentMonth);
  //const formatedDate = format(currentMonth, "yyyy-MM"); //date-fnsで日付をフォーマット
  //console.log(formatedDate);

  //firestoreのエラーかどうかを判定する関数
  const isFireStoreError = (
    err: unknown
  ): err is { code: string; message: string } => {
    return typeof err === "object" && err !== null && "code" in err; //エラーはオブジェクトであり、nullでなく、codeプロパティを持っている
  };

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

        console.log(transactionsData);
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
      }
    };

    fetchTransactions();
  }, []);

  //今月のデータにのみを絞り込む
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(currentMonth);
  });
  console.log(monthlyTransactions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={<Home monthlyTransactions={monthlyTransactions} />}
            />
            <Route path="/report" element={<Report />} />
            <Route path="/*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
