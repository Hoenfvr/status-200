import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
} from '@mui/material';

type Status = 'Pending' | 'Approved' | 'Rejected';

const data = [
  { name: 'pattira kownrawee', building: 'Building 9', room: '92A', date: '2024-09-26', time: '10:00 AM - 12:00 PM', people: 5, status: 'Pending' },
  { name: 'pattira kownrawee', building: 'Building 9', room: '948', date: '2024-09-26', time: '10:00 AM - 12:00 PM', people: 5, status: 'Approved' },
  { name: 'pattira kownrawee', building: 'Building 11', room: '1125', date: '2024-09-26', time: '10:00 AM - 12:00 PM', people: 5, status: 'Rejected' },
];

const statusColors: Record<Status, { color: string; buttonApprove: string; buttonReject: string }> = {
  Pending: { color: 'orange', buttonApprove: 'success', buttonReject: 'error' },
  Approved: { color: 'green', buttonApprove: 'inherit', buttonReject: 'inherit' },
  Rejected: { color: 'red', buttonApprove: 'inherit', buttonReject: 'inherit' },
};

export default function approveTable() {
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
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.building}</TableCell>
              <TableCell>{row.room}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.people}</TableCell>
              <TableCell sx={{ color: statusColors[row.status as Status].color }}>
                {row.status}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
          //         color={statusColors[row.status as Status].buttonApprove}
                  disabled={row.status !== 'Pending'}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
          //         color={statusColors[row.status as Status].buttonReject}
                  sx={{ marginLeft: 1 }}
                  disabled={row.status !== 'Pending'}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
