import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Drawer,
  Grid2,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
//アイコン
import NotesIcon from "@mui/icons-material/Notes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DailySummary from "./DailySummary";
import { Transaction } from "../types";
import { formatCurrency } from "../utils/formating";
import IconComponents from "./common/IconComponents";

interface TransactionProps {
  dailyTrabsactions: Transaction[];
  currentDay: string;
}

const TransactionMenu = ({
  dailyTrabsactions,
  currentDay,
}: TransactionProps) => {
  const menuDrawerWidth = 320;
  return (
    <Drawer
      sx={{
        width: menuDrawerWidth,
        "& .MuiDrawer-paper": {
          width: menuDrawerWidth,
          boxSizing: "border-box",
          p: 2,
          top: 64,
          height: `calc(100% - 64px)`, // AppBarの高さを引いたビューポートの高さ
        },
      }}
      variant={"permanent"}
      anchor={"right"}
    >
      <Stack sx={{ height: "100%" }} spacing={2}>
        {/* 日付 */}
        <Typography fontWeight={"fontWeightBold"}>
          日時： {currentDay}
        </Typography>
        <DailySummary dailyTrabsactions={dailyTrabsactions} />

        {/* 内訳タイトル&内訳追加ボタン */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          {/* 左側のメモアイコンとテキスト */}
          <Box display="flex" alignItems="center">
            <NotesIcon sx={{ mr: 1 }} />
            <Typography variant="body1">内訳</Typography>
          </Box>
          {/* 右側の追加ボタン */}
          <Button startIcon={<AddCircleIcon />} color="primary">
            内訳を追加
          </Button>
        </Box>

        {/* 取引一覧 */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <List aria-label="取引履歴">
            <Stack spacing={2}>
              {dailyTrabsactions.map((transaction) => (
                <ListItem disablePadding key={transaction.id}>
                  <Card
                    sx={{
                      width: "100%",
                      backgroundColor:
                        transaction.type === "income"
                          ? (theme) => theme.palette.incomeColor.light
                          : (theme) => theme.palette.outgoColor.light,
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Grid2
                          container
                          spacing={1}
                          alignItems="center"
                          wrap="wrap"
                        >
                          <Grid2 size={{ xs: 1 }}>
                            {/* icon */}
                            {IconComponents[transaction.category]}
                          </Grid2>
                          <Grid2 size={{ xs: 2.5 }} padding={{ xs: 0.5 }}>
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              {transaction.category}
                            </Typography>
                          </Grid2>
                          <Grid2 size={{ xs: 4 }}>
                            <Typography variant="body2" gutterBottom>
                              {transaction.category}
                            </Typography>
                          </Grid2>
                          <Grid2 size={{ xs: 4.5 }}>
                            <Typography
                              gutterBottom
                              textAlign={"right"}
                              color="text.secondary"
                              sx={{
                                wordBreak: "break-all",
                              }}
                            >
                              ¥{formatCurrency(transaction.amount)}
                            </Typography>
                          </Grid2>
                        </Grid2>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </ListItem>
              ))}
            </Stack>
          </List>
        </Box>
      </Stack>
    </Drawer>
  );
};
export default TransactionMenu;
