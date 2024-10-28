import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CalendarHeader = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="prev">
        <ArrowBackIosIcon />
      </IconButton>
      <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
        September 2024
      </Typography>
      <IconButton edge="end" color="inherit" aria-label="next">
        <ArrowForwardIosIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);
