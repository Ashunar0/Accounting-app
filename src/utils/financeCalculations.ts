import { Balance, Transaction } from "../types";

export const financeCalculations = (transactions: Transaction[]): Balance => {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
      } else {
        acc.outgo += transaction.amount;
      }

      acc.balance = acc.income - acc.outgo;

      return acc;
    },
    {
      income: 0,
      outgo: 0,
      balance: 0,
    }
  );
};

//日付ごとの収支を計算する関数
export const calculateDailyBalances = (
  transactions: Transaction[]
): Record<string, Balance> => {
  return transactions.reduce<Record<string, Balance>>((acc, transaction) => {
    const date = transaction.date;

    if (!acc[date]) {
      acc[date] = { income: 0, outgo: 0, balance: 0 };
    }

    if (transaction.type === "income") {
      acc[date].income += transaction.amount;
    } else {
      acc[date].outgo += transaction.amount;
    }

    //収支を計算
    acc[date].balance = acc[date].income - acc[date].outgo;

    return acc;
  }, {});
};
