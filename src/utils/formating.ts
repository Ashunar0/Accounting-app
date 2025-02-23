import { format } from "date-fns/fp";

export const formatMonth = (date: string): string => {
  return format(date, "yyyy-MM");
};
