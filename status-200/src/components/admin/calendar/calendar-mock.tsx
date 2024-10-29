// components/Calendar.tsx
'use client';
import React, { useState } from 'react';
import { Box, Typography, IconButton, Grid, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from 'dayjs';

// Sample events data
const events = [
  { date: '2024-10-01', name: 'Meeting room 1125', color: '#d4b5ff' },
  { date: '2024-10-01', name: 'Meeting room 1351', color: '#b5d4ff' },
  { date: '2024-10-02', name: 'Meeting room 1351', color: '#b5d4ff' },
  { date: '2024-10-02', name: 'Meeting room 926', color: '#ffd1b5' },
  { date: '2024-10-02', name: 'Meeting room 1125', color: '#d4b5ff' },
  { date: '2024-10-03', name: 'Meeting room 92A', color: '#ffdeb5' },
  { date: '2024-10-04', name: 'Meeting room 926', color: '#ffd1b5' },
];

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  const daysInMonth = dayjs(`${currentYear}-${currentMonth + 1}`).daysInMonth();

  // Get the first day of the month
  const firstDayOfMonth = dayjs(`${currentYear}-${currentMonth + 1}-01`).day();

  // Function to handle month change
  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear(currentYear - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear(currentYear + 1);
  };

  // Generate calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // empty slots for days before the first day of the month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Get events for a specific date
  const getEventsForDate = (date: string) => {
    return events.filter((event) => event.date === date);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Events
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <IconButton onClick={handlePrevMonth}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h6">{dayjs(`${currentYear}-${currentMonth + 1}`).format('MMMM YYYY')}</Typography>
        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Grid container spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Grid item xs={1.71} key={day}>
            <Typography align="center" sx={{ fontWeight: 'bold' }}>
              {day}
            </Typography>
          </Grid>
        ))}

        {calendarDays.map((day, index) => (
          <Grid item xs={1.71} key={index}>
            <Paper sx={{ height: 100, padding: 1, position: 'relative' }}>
              <Typography align="center">{day}</Typography>
              {day &&
                getEventsForDate(`${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day
                  .toString()
                  .padStart(2, '0')}`).map((event, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      backgroundColor: event.color,
                      padding: '2px',
                      borderRadius: '4px',
                      marginTop: '4px',
                      textAlign: 'center',
                      fontSize: '12px',
                    }}
                  >
                    {event.name}
                  </Box>
                ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Calendar;
