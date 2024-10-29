'use client';

import React from 'react';
import { Block, Delete, Edit } from '@mui/icons-material';
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

// Define the structure for an employee object
interface Employee {
  id: string;
  name: string;
  surname: string;
  position: string;
  department: string;
  role: string;
}

// Dummy data for employee list
const employees: Employee[] = [
  {
    id: '6611860023',
    name: 'pattira',
    surname: 'kwnranrawee',
    position: 'Teacher',
    department: 'Computer',
    role: 'user',
  },
];

const EmployeeManagement: React.FC = () => {
  // Function to handle edit action
  const handleEdit = (id: string) => {
    console.log(`Edit employee with ID: ${id}`);
  };

  // Function to handle delete action
  const handleDelete = (id: string) => {
    console.log(`Delete employee with ID: ${id}`);
  };

  // Function to handle block action
  const handleBlock = (id: string) => {
    console.log(`Block employee with ID: ${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Stack direction="column" alignItems="end" spacing={2} sx={{ padding: 2 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ mb: 2, ml: 2 }}>
          Add
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Positions</TableCell>
            <TableCell>Departments</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow key={index}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.surname}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(employee.id)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(employee.id)} color="secondary">
                  <Delete />
                </IconButton>
                <IconButton onClick={() => handleBlock(employee.id)} color="error">
                  <Block />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeManagement;
