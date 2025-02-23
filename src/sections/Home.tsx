import { Box } from "@mui/material";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";
import { useState } from "react";
import { format } from "date-fns";

interface Homeprops {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Home = ({ monthlyTransactions, setCurrentMonth }: Homeprops) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  //console.log(currentDay);

  //1日分のデータを取得
  const dailyTrabsactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });
  //console.log(dailyTrabsactions);

  return (
    <Box sx={{ display: "flex" }}>
      {/* left side content */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
        />
      </Box>

      {/* right side content */}
      <Box>
        <TransactionMenu
          dailyTrabsactions={dailyTrabsactions}
          currentDay={currentDay}
        />
        <TransactionForm />
      </Box>
    </Box>
  );
};

export default Home;
