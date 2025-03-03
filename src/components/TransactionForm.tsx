import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import AlarmIcon from "@mui/icons-material/Alarm"; //アラームアイコン
import TrainIcon from "@mui/icons-material/Train"; //電車アイコン
import AddHomeIcon from "@mui/icons-material/AddHome"; //家アイコン
import Diversity3Icon from "@mui/icons-material/Diversity3"; //多様性アイコン
import SportsTennisIcon from "@mui/icons-material/SportsTennis"; //テニスアイコン
import WorkIcon from "@mui/icons-material/Work"; //仕事アイコン
import AddBusinessIcon from "@mui/icons-material/AddBusiness"; //ビジネスアイコン
import SavingsIcon from "@mui/icons-material/Savings"; //貯金アイコン
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { IncomeCategory, OutgoCategory, Transaction } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, transactionSchema } from "../validations/schema";

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  selectedTransaction: Transaction | null;
  onDeleteTransaction: (id: string) => Promise<void>;
  setSelectedTransaction: React.Dispatch<
    React.SetStateAction<Transaction | null>
  >;
  onUpdateTransaction: (
    transaction: Schema,
    transactionId: string
  ) => Promise<void>;
}

type ValueType = "income" | "outgo";

interface CategoryItem {
  label: IncomeCategory | OutgoCategory;
  icon: React.JSX.Element;
}

const TransactionForm = ({
  onCloseForm,
  isEntryDrawerOpen,
  currentDay,
  onSaveTransaction,
  selectedTransaction,
  onDeleteTransaction,
  setSelectedTransaction,
  onUpdateTransaction,
}: TransactionFormProps) => {
  const formWidth = 320;

  const outgoCategories: CategoryItem[] = [
    { label: "食費", icon: <FastfoodIcon fontSize="small" /> },
    { label: "日用品", icon: <AlarmIcon fontSize="small" /> },
    { label: "交通費", icon: <TrainIcon fontSize="small" /> },
    { label: "居住費", icon: <AddHomeIcon fontSize="small" /> },
    { label: "交際費", icon: <Diversity3Icon fontSize="small" /> },
    { label: "趣味", icon: <SportsTennisIcon fontSize="small" /> },
  ];

  const incomeCategories: CategoryItem[] = [
    { label: "給与", icon: <WorkIcon fontSize="small" /> },
    { label: "副収入", icon: <AddBusinessIcon fontSize="small" /> },
    { label: "お小遣い", icon: <SavingsIcon fontSize="small" /> },
  ];

  const [categories, setCategories] = useState(outgoCategories);

  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Schema>({
    defaultValues: {
      type: "outgo",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    },
    resolver: zodResolver(transactionSchema),
  });
  //console.log(errors);

  //収入・支出の切り替え
  const toggleValue = (type: ValueType) => {
    setValue("type", type);
    setValue("category", "");
  };

  //現在のフォームのタイプを監視
  const currentType = watch("type");
  //console.log(currentType);

  //収支のカテゴリを切り替え
  useEffect(() => {
    const newCategories =
      currentType === "income" ? incomeCategories : outgoCategories;
    setCategories(newCategories);
  }, [currentType]);

  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay]);

  //保存ボタンが押された時の処理
  const onSubmit: SubmitHandler<Schema> = (data) => {
    console.log(data);

    if (selectedTransaction) {
      onUpdateTransaction(data, selectedTransaction.id)
        .then(() => {
          console.log("更新");
          setSelectedTransaction(null);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      onSaveTransaction(data)
        .then(() => {
          console.log("保存");
          setSelectedTransaction(null);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    reset({
      type: "outgo",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    }); //日付以外をリセット
  };

  useEffect(() => {
    //選択肢が更新されたかどうかを確認
    if (selectedTransaction) {
      const categoryExists = categories.some(
        (category) => category.label === selectedTransaction?.category
      );
      console.log(categories);
      console.log(categoryExists);
      setValue("category", categoryExists ? selectedTransaction.category : "");
    }
  }, [selectedTransaction, categories]);

  useEffect(() => {
    if (selectedTransaction) {
      setValue("type", selectedTransaction.type);
      setValue("date", selectedTransaction.date);
      setValue("amount", selectedTransaction.amount);
      setValue("content", selectedTransaction.content);
    } else {
      reset({
        type: "outgo",
        date: currentDay,
        amount: 0,
        category: "",
        content: "",
      });
    }
  }, [selectedTransaction]);

  const handleDelete = () => {
    if (selectedTransaction) {
      onDeleteTransaction(selectedTransaction.id);
      setSelectedTransaction(null);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* フォーム要素 */}
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonGroup fullWidth>
                <Button
                  variant={field.value === "outgo" ? "contained" : "outlined"}
                  color="error"
                  onClick={() => {
                    toggleValue("outgo");
                  }}
                >
                  支出
                </Button>
                <Button
                  variant={field.value === "income" ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => {
                    toggleValue("income");
                  }}
                >
                  収入
                </Button>
              </ButtonGroup>
            )}
          />

          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />

          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="カテゴリ"
                label="カテゴリ"
                select
                error={!!errors.category}
                helperText={errors.category?.message}
              >
                {categories.map((category) => (
                  <MenuItem value={category.label} key={category.label}>
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }}
                label="金額"
                type="number"
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            )}
          />

          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="内容"
                type="text"
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />

          {/* 保存ボタン */}
          <Button
            type="submit"
            variant="contained"
            color={currentType === "income" ? "primary" : "error"}
            fullWidth
          >
            {selectedTransaction ? "更新" : "保存"}
          </Button>

          {/* 削除ボタン */}
          {selectedTransaction && (
            <Button
              type="submit"
              variant="outlined"
              color={"secondary"}
              fullWidth
              onClick={handleDelete}
            >
              削除
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default TransactionForm;
