import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { Box, Typography, useTheme } from "@mui/material";
import { CircularProgress } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

const BarChart = ({ monthlyTransactions, isLoading }: BarChartProps) => {
  const theme = useTheme();

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      // legend: {
      //   position: "left" as const,
      // },
      title: {
        display: true,
        text: "日別収支",
      },
    },
  };

  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  //console.log(dailyBalances);

  const dateLabels = Object.keys(dailyBalances).sort();
  //console.log(dateLabels);
  const outgoData = dateLabels.map((date) => dailyBalances[date].outgo);
  //console.log(outgoData);
  const incomeData = dateLabels.map((date) => dailyBalances[date].income);
  //console.log(incomeData);

  const data: ChartData<"bar"> = {
    labels: dateLabels,
    datasets: [
      {
        label: "支出",
        data: outgoData,
        backgroundColor: theme.palette.outgoColor.light,
      },
      {
        label: "収入",
        data: incomeData,
        backgroundColor: theme.palette.incomeColor.light,
      },
    ],
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : monthlyTransactions.length > 0 ? (
        <Bar options={options} data={data} />
      ) : (
        <Typography>データがありません</Typography>
      )}
    </Box>
  );
};

export default BarChart;
