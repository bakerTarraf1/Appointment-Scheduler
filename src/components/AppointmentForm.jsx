import React, { useState, useEffect } from 'react';

function AppointmentForm({ onAddAppointment, appointmentToEdit, onUpdateAppointment, selectedDate }) {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  // تحديث الحقول عندما يتم تحميل الموعد للتعديل
  useEffect(() => {
    if (appointmentToEdit) {
      setName(appointmentToEdit.name);
      setTime(appointmentToEdit.time);
    } else {
      setName('');
      setTime('');
    }
  }, [appointmentToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert('Please select a date first!');
      return;
    }

    const appointment = { name, date: selectedDate.toLocaleDateString(), time };

    if (appointmentToEdit) {
      // إذا كان هناك موعد للتعديل
      onUpdateAppointment(appointmentToEdit.index, appointment);
    } else {
      // إذا كان موعد جديد
      onAddAppointment(appointment);
    }

    // إعادة تعيين الحقول بعد الإضافة أو التعديل
    setName('');
    setTime('');
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <button type="submit">
        {appointmentToEdit ? 'Edit Appointment' : 'Add Appointment'}
      </button>
    </form>
  );
}

export default AppointmentForm;