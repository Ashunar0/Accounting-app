import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import { Transaction } from "../types";
import { financeCalculations } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formating";

interface DailySummaryProps {
  dailyTrabsactions: Transaction[];
}

const DailySummary = ({ dailyTrabsactions }: DailySummaryProps) => {
  const { income, outgo, balance } = financeCalculations(dailyTrabsactions);

  return (
    <Box>
      <Grid2 container spacing={2}>
        {/* 収入 */}
        <Grid2 size={{ xs: 6 }} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                収入
              </Typography>
              <Typography
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{
                  wordBreak: "break-all",
                  color: (theme) => theme.palette.incomeColor.main,
                }}
              >
                ¥{formatCurrency(income)}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        {/* 支出 */}
        <Grid2 size={{ xs: 6 }} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                支出
              </Typography>
              <Typography
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{
                  wordBreak: "break-all",
                  color: (theme) => theme.palette.outgoColor.main,
                }}
              >
                ¥{formatCurrency(outgo)}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        {/* 残高 */}
        <Grid2 size={{ xs: 12 }} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                残高
              </Typography>
              <Typography
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{
                  wordBreak: "break-all",
                  color: (theme) => theme.palette.balanceColor.main,
                }}
              >
                ¥{formatCurrency(balance)}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};
export default DailySummary;
