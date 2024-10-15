'use client';

import React from 'react';
import { Delete, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

// Define the structure for a room object
interface Room {
  roomName: string;
  building: number;
  floor: number;
  capacity: number;
  type: 'vip' | 'normal';
}

// Dummy data for room list
const rooms: Room[] = [
  { roomName: '92A', building: 9, floor: 2, capacity: 30, type: 'vip' },
  { roomName: '92A', building: 9, floor: 2, capacity: 20, type: 'normal' },
  { roomName: '92A', building: 9, floor: 2, capacity: 35, type: 'normal' },
];

const RoomManagement: React.FC = () => {
  // Function to handle edit action
  const handleEdit = (roomName: string) => {
    console.log(`Edit room: ${roomName}`);
  };

  // Function to handle delete action
  const handleDelete = (roomName: string) => {
    console.log(`Delete room: ${roomName}`);
  };

  return (
    <TableContainer component={Paper}>
      <Stack direction="column" alignItems="end" spacing={2} sx={{ padding: 2 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ mb: 2, ml: 2 }}>
          Add
        </Button>
      </Stack>
      {/* <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" padding={2}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} alignItems="end" sx={{ mb: 2, ml: 2 }}>
          Add
        </Button>
      </Stack> */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room Name</TableCell>
            <TableCell>Building</TableCell>
            <TableCell>Floor</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room, index) => (
            <TableRow key={index}>
              <TableCell>{room.roomName}</TableCell>
              <TableCell>{room.building}</TableCell>
              <TableCell>{room.floor}</TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell>{room.type}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(room.roomName)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(room.roomName)} color="secondary">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomManagement;
