import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jalocale from "@fullcalendar/core/locales/ja";
import "../Calendar.css";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core/index.js";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { Balance, CalenderContent, Transaction } from "../types";
import { formatCurrency } from "../utils/formating";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useTheme } from "@mui/material";
import { isSameMonth } from "date-fns";

interface Calendarprops {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  today: string;
}

const Calendar = ({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
  currentDay,
  today,
}: Calendarprops) => {
  const theme = useTheme();

  //カレンダーの背景を赤色にするためのeventオブジェクト
  const backgroundEvent = {
    start: currentDay,
    display: "background",
    background: theme.palette.incomeColor.light,
  };

  //日ごとの収支を計算して、オブジェクトを作成
  const dailyBalance = calculateDailyBalances(monthlyTransactions);
  //console.log(dailyBalance);

  //カレンダーに反映させるためにeventsオブジェクトを作成する関数
  const createCalendarEvents = (
    dailyBalance: Record<string, Balance>
  ): CalenderContent[] => {
    //obuject.keysでオブジェクトのキーを配列として取得し、mapで展開、eventsオブジェクトを作成
    return Object.keys(dailyBalance).map((date) => {
      const { income, outgo, balance } = dailyBalance[date]; //eventsオブジェクトのプロパティ
      return {
        start: date,
        income: formatCurrency(income),
        outgo: formatCurrency(outgo),
        balance: formatCurrency(balance),
      };
    });
  };

  //eventオブジェクトを作成
  const calendarEvent = createCalendarEvents(dailyBalance);
  //console.log(calendarEvent);
  //console.log([...calendarEvent, backgroundEvent]); //2つのeventを統合

  //カレンダーに表示するコンテンツを作成
  const renderEventContent = (eventInfo: EventContentArg) => {
    //console.log(eventInfo);
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>

        <div className="money" id="event-outgo">
          {eventInfo.event.extendedProps.outgo}
        </div>

        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };

  //カレンダーで月を移動した時に、月を取得する関数
  const handleDateSet = (dateSetInfo: DatesSetArg) => {
    const currentMonth = dateSetInfo.view.currentStart;
    //console.log(dateSetInfo);
    setCurrentMonth(dateSetInfo.view.currentStart);
    const todayDate = new Date();
    if (isSameMonth(todayDate, currentMonth)) setCurrentDay(today);
  };

  //カレンダー上で日付を選択した時の処理
  const handleDateClick = (dateInfo: DateClickArg) => {
    //console.log(dateInfo);
    setCurrentDay(dateInfo.dateStr);
  };

  return (
    <FullCalendar
      locale={jalocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[...calendarEvent, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  );
};

export default Calendar;
