import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface UserPowerBarProps {
  power: number; // 0-100
  userName: string;
}

const UserPowerBar: React.FC<UserPowerBarProps> = ({ power, userName }) => (
  <Box sx={{ width: 250, margin: '16px auto', textAlign: 'center' }}>
    <Typography variant="subtitle1" gutterBottom>
      {userName}'s Power Level
    </Typography>
    <LinearProgress variant="determinate" value={power} sx={{ height: 12, borderRadius: 6 }} />
    <Typography variant="body2" sx={{ marginTop: 1, color: '#fff' }}>
      {power} / 100
    </Typography>
  </Box>
);

export default UserPowerBar;
