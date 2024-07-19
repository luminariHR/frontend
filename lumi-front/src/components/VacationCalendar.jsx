import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";

const VacationCalendar = ({ events, handleEventClick }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      height="100%"
      events={events}
      eventClick={handleEventClick}
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
