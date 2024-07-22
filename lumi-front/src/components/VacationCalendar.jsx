import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";

const VacationCalendar = ({
  events,
  handleEventClick,
  getThisMonthPtoList,
}) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      height="100%"
      events={events}
      eventClick={handleEventClick}
      datesSet={(event) => {
        let midDate = new Date(
          (event.start.getTime() + event.end.getTime()) / 2,
        );
        let month = midDate.getMonth() + 1;
        getThisMonthPtoList(month, midDate.getFullYear());
      }}
      eventDidMount={(info) => {
        info.el.style.cursor = "pointer";
      }}
      locale={koLocale}
      headerToolbar={{
        left: "prev",
        center: "title",
        right: "next",
      }}
      buttonIcons={{
        prev: "chevrons-left",
        next: "chevrons-right",
      }}
    />
  );
};

export default VacationCalendar;
