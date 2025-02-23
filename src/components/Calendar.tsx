import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jalocale from "@fullcalendar/core/locales/ja";
import "../Calendar.css";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { Balance, CalenderContent, Transaction } from "../types";
import { create } from "@mui/material/styles/createTransitions";
import { formatCurrency } from "../utils/formating";

interface Calendarprops {
  monthlyTransactions: Transaction[];
}

const Calendar = ({ monthlyTransactions }: Calendarprops) => {
  // const events = [
  //   {
  //     title: "event 1",
  //     start: "2025-02-21",
  //     income: 300,
  //     outgo: 200,
  //     balance: 100,
  //   },
  // ];

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

  return (
    <FullCalendar
      locale={jalocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calendarEvent}
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
