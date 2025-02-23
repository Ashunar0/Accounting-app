import { Box } from "@mui/material";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";

interface Homeprops {
  monthlyTransactions: Transaction[];
}

const Home = ({ monthlyTransactions }: Homeprops) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* left side content */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar monthlyTransactions={monthlyTransactions} />
      </Box>

      {/* right side content */}
      <Box>
        <TransactionMenu />
        <TransactionForm />
      </Box>
    </Box>
  );
};

export default Home;
