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
