export type TransactionType = "income" | "outgo";

export type IncomeCategory = "給与" | "副収入" | "お小遣い";
export type OutgoCategory = "食費" | "日用品" | "交通費" | "交際費" | "趣味";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  content: string;
  type: TransactionType;
  category: IncomeCategory | OutgoCategory;
}

export interface Balance {
  income: number;
  outgo: number;
  balance: number;
}
