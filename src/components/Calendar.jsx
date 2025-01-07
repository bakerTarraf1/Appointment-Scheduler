import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // تأكد من إضافة أنماط التقويم

function CalendarComponent({ selectedDate, onDateChange }) {
  return (
    <div className="calendar-container">
      <h3>Choose a date to schedule an appointment</h3>
      <Calendar
        onChange={onDateChange} // تحديث التاريخ عند الاختيار
        value={selectedDate} // تعيين التاريخ المحدد
      />
    </div>
  );
}

export default CalendarComponent;