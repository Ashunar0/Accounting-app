import { Box, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addMonths } from "date-fns";
import { ja as jaLocale } from "date-fns/locale";

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
}

const MonthSelector = ({
  currentMonth,
  setCurrentMonth,
}: MonthSelectorProps) => {
  const handlePrevMonth = () => {
    const prevMonth = addMonths(currentMonth, -1);
    //console.log(prevMonth);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    //console.log(nextMonth);
    setCurrentMonth(nextMonth);
  };

  const handleDateChange = (newDate: Date | null) => {
    //console.log(newDate);
    if (newDate) {
      setCurrentMonth(newDate);
    }
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={jaLocale}
      dateFormats={{ year: "yyyy" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={handlePrevMonth} color={"error"} variant="contained">
          先月
        </Button>
        <DatePicker
          onChange={handleDateChange}
          value={currentMonth}
          label="月を選択"
          sx={{ mx: 2, backgroundColor: "white" }}
          views={["year", "month"]}
          format="yyyy/MM"
          slotProps={{ toolbar: { toolbarFormat: "yyyy/MM" } }}
        />
        <Button onClick={handleNextMonth} color={"primary"} variant="contained">
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthSelector;
