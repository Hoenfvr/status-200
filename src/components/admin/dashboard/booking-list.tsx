'use client';
import React, { useEffect, useState } from 'react';

interface Booking {
  id: number;
  name: string;
  date: string;
  status: string;
}

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Fetch bookings from an API or database
    const fetchBookings = async () => {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Booking List</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.name} - {booking.date} - {booking.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
