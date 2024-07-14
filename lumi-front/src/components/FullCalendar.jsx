import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';

const Calendar = ({ events, handleDateClick }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      height="100%"
      eventBackgroundColor='green'
      eventTextColor='white'
      eventBorderColor='white'
      events={events}
      dateClick={handleDateClick}
      locale={koLocale}
      headerToolbar={{
        left: 'prev',
        center: 'title',
        right: 'next',
      }}
      buttonIcons={{
        prev: 'chevrons-left',
        next: 'chevrons-right'
      }}
    />
  );
}

export default Calendar;
