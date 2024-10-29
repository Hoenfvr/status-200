'use client';

import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

const rooms = [
  { id: 1, name: 'Room 1351', building: 'Build 13' },
  { id: 2, name: 'Room 1225', building: 'Build 12' },
  { id: 3, name: 'Room 947', building: 'Build 9' },
  { id: 4, name: 'Room 1125', building: 'Build 11' },
];

export default function Booking() {
  const [formData, setFormData] = useState({
    topic: '',
    details: '',
    attendees: '',
    startDate: '',
    endDate: '',
    type: 'Normal',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Add form submission logic
    console.log('Form Data:', formData);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Booking Details</Typography>
            <TextField
              label="Topic"
              name="topic"
              fullWidth
              margin="normal"
              value={formData.topic}
              onChange={handleChange}
            />
            <TextField
              label="Details"
              name="details"
              fullWidth
              margin="normal"
              value={formData.details}
              onChange={handleChange}
            />
            <TextField
              label="Number of attendees"
              name="attendees"
              type="number"
              fullWidth
              margin="normal"
              value={formData.attendees}
              onChange={handleChange}
            />
            <TextField
              label="Start"
              name="startDate"
              type="datetime-local"
              fullWidth
              margin="normal"
              value={formData.startDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End"
              name="endDate"
              type="datetime-local"
              fullWidth
              margin="normal"
              value={formData.endDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <Typography variant="h6" style={{ marginTop: '10px' }}>
              Type Room
            </Typography>
            <RadioGroup row name="type" value={formData.type} onChange={handleChange} style={{ marginTop: '10px' }}>
              <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
              <FormControlLabel value="VIP" control={<Radio />} label="VIP" />
            </RadioGroup>
            <Button style={{ marginTop: '10px' }} variant="contained" color="primary" onClick={handleSave} fullWidth>
              Save
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={9}>
        {rooms.map((room) => (
          <Card key={room.id} style={{ marginBottom: '10px' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flexGrow: 1 }}>
                <Typography variant="h6">{room.name}</Typography>
                <Typography color="textSecondary">Building {room.building}</Typography>
              </div>
              <IconButton color="primary">
                <AddIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
}
