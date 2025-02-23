import { format } from "date-fns/fp";

//日付をフォーマットする関数
export const formatMonth = (date: Date): string => {
  return format("yyyy-MM", date);
};

//金額をフォーマットする関数
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("ja-JP");
};
