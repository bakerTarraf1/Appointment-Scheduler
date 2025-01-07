import React from 'react';

function AppointmentCard({ appointment, onDelete, onEdit }) {
  return (
    <div className="appointment-card">
      <p><strong>{appointment.name}</strong></p>
      <p>{appointment.date}</p>
      <p>{appointment.time}</p>
      <div className="appointment-actions">
        <button onClick={() => onEdit(appointment)}>
          Edit
        </button>
        <button onClick={() => onDelete(appointment)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default AppointmentCard;