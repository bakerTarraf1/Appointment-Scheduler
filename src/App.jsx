import React, { useState } from 'react';
import Calendar from './components/Calendar';
import AppointmentForm from './components/AppointmentForm';
import Notification from './components/Notification'; 
import './App.css';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [notification, setNotification] = useState('');
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // تحديد الحد الأقصى للمواعيد في اليوم
  const maxAppointmentsPerDay = 10;

  // التحقق من عدد المواعيد في اليوم المحدد
  const getAppointmentsForDate = (date) => {
    return appointments.filter(
      (appointment) => appointment.date === date.toLocaleDateString()
    );
  };

  // التحقق من توافر الوقت في نفس اليوم
  const isTimeAvailable = (time, date) => {
    const appointmentsForDate = getAppointmentsForDate(date);
    return !appointmentsForDate.some((appointment) => appointment.time === time);
  };

  const handleAddAppointment = (appointment) => {
    const appointmentsForDate = getAppointmentsForDate(selectedDate);

    // التحقق من أن الحد الأقصى للمواعيد لم يتم تجاوزه
    if (appointmentsForDate.length >= maxAppointmentsPerDay) {
      setNotification('Weve reached the maximum number of appointments for today!');
      return;
    }

    // التحقق من توافر الوقت في نفس اليوم
    if (!isTimeAvailable(appointment.time, selectedDate)) {
      setNotification('The specified time is already booked, choose another time!');
      return;
    }

    // إضافة الموعد إذا لم يتجاوز الحد الأقصى وكان الوقت متاحًا
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
    setNotification('The appointment was added successfully!');
  };

  const handleDeleteAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    setNotification('Appointment deleted successfully!');
  };

  const handleEditAppointment = (index) => {
    const appointment = appointments[index];
    setAppointmentToEdit({ ...appointment, index }); // تعيين الموعد الذي سيتم تعديله
  };

  const handleUpdateAppointment = (index, updatedAppointment) => {
    const updatedAppointments = appointments.map((appointment, i) =>
      i === index ? updatedAppointment : appointment
    );
    setAppointments(updatedAppointments);
    setNotification('The appointment has been modified successfully!');
    setAppointmentToEdit(null); // إلغاء وضع التعديل بعد التحديث
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // تعيين التاريخ المحدد
  };

  return (
    <div className="app">
      <h1>Appointment Scheduler</h1>
      <div className="content">
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
        <AppointmentForm 
          onAddAppointment={handleAddAppointment} 
          appointmentToEdit={appointmentToEdit}
          onUpdateAppointment={handleUpdateAppointment} 
          selectedDate={selectedDate}
        />
      </div>
      <h2>Your Appointments</h2>
      <div className="appointments-list">
        {appointments.map((appointment, index) => (
          <div key={index} className="appointment-card">
            <p><strong>{appointment.name}</strong> - Appointment No: {index + 1}</p>
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
            <div className="appointment-actions">
              <button onClick={() => handleEditAppointment(index)}>
                Edit
              </button>
              <button onClick={() => handleDeleteAppointment(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {notification && <Notification message={notification} />}
    </div>
  );
}

export default App;