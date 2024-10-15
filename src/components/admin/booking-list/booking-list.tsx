import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Define the shape of a booking object
interface Booking {
  name: string;
  building: string;
  room: string;
  date: string;
  time: string;
  people: number;
  status: 'Pending' | 'Approved' | 'Rejected';
}

// Dummy data for booking list
const bookings: Booking[] = [
  { name: 'pattira kworawree', building: 'Building 9', room: '92A', date: '2024-09-26', time: '10:00 AM - 12:00 PM', people: 5, status: 'Pending' },
  { name: 'pattira kworawree', building: 'Building 9', room: '92A', date: '2024-09-26', time: '10:00 AM - 12:00 PM', people: 5, status: 'Approved' },
  { name: 'pattira kworawree', building: 'Building 9', room: '93A', date: '2024-09-26', time: '10:00 AM - 12:00 PM', people: 5, status: 'Rejected' },
  { name: 'pattira kworawree', building: 'Building 9', room: '94A', date: '2024-09-26', time: '10:00 AM - 12:00 PM', people: 5, status: 'Approved' },
  { name: 'pattira kworawree', building: 'Building 9', room: '92B', date: '2024-09-26', time: '10:00 AM - 12:00 PM', people: 5, status: 'Pending' },
];

// Styled component for status label
// const StatusLabel = styled('span')<{ status: string }>(({ status }) => ({
//   color: status === 'Approved' ? 'green' : status === 'Rejected' ? 'red' : 'orange',
//   fontWeight: 'bold',
// }));

const BookingList: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Building</TableCell>
            <TableCell>Room</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>People</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking, index) => (
            <TableRow key={index}>
              <TableCell>{booking.name}</TableCell>
              <TableCell>{booking.building}</TableCell>
              <TableCell>{booking.room}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.time}</TableCell>
              <TableCell>{booking.people}</TableCell>
              <TableCell>
                {/* <StatusLabel status={booking.status}>{booking.status}</StatusLabel> */}
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingList;
