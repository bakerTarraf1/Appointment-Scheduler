import React, { useEffect } from 'react';

function Notification({ message }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // إخفاء الإشعار بعد 5 ثواني
      console.log('Notification dismissed');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="notification">
      {message}
    </div>
  );
}

export default Notification;