import { Card, CardContent, Grid2, Stack, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const MonthlySummary = () => {
  return (
    <Grid2 container spacing={{ xs: 1, sm: 2 }} mb={2}>
      {/* income */}
      <Grid2 size={{ xs: 4 }} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.incomeColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
              <Typography>収入</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: { sx: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              ¥100,000
            </Typography>
          </CardContent>
        </Card>
      </Grid2>

      {/* outgo */}
      <Grid2 size={{ xs: 4 }} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.outgoColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <ArrowDownwardIcon sx={{ fontSize: "2rem" }} />
              <Typography>支出</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: { sx: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              ¥100,000
            </Typography>
          </CardContent>
        </Card>
      </Grid2>

      {/* income */}
      <Grid2 size={{ xs: 4 }} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.balanceColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <AccountBalanceIcon sx={{ fontSize: "2rem" }} />
              <Typography>残高</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: { sx: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              ¥100,000
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default MonthlySummary;
