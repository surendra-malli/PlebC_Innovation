import React from 'react';
import { Typography, AppBar, Toolbar } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" color='none' >
      <Toolbar>
        <Typography variant="h6">
          Pediatrics Department Screen
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;