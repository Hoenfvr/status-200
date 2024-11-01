'use client';

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/employee', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="contained" color="primary" sx={{ float: 'right', mb: 2 }}>
        + Add
      </Button>

      {loading && <CircularProgress />}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Firstname</TableCell>
                <TableCell align="center">Surname</TableCell>
                <TableCell align="center">Positions</TableCell>
                <TableCell align="center">Departments</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell align="center">{employee.id}</TableCell>
                  <TableCell align="center">{employee.fnameth}</TableCell>
                  <TableCell align="center">{employee.lnameth}</TableCell>
                  <TableCell align="center">{employee.position}</TableCell>
                  <TableCell align="center">{employee.department_id}</TableCell>
                  <TableCell align="center">{employee.user_type}</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" sx={{ mr: 1 }}>
                      Delete
                    </Button>
                    <Button variant="outlined" color="error">
                      Block
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default EmployeeManagement;
