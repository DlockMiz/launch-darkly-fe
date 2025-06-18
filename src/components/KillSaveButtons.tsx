import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface KillSaveButtonsProps {
    onKill?: () => void;
    onSave?: () => void;
}

const KillSaveButtons: React.FC<KillSaveButtonsProps> = ({ onKill, onSave }) => (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 2 }}>
        <Button
            variant="contained"
            color="error"
            onClick={onKill}
            sx={{ fontWeight: 'bold' }}
        >
            Kill
        </Button>
        <Button
            variant="contained"
            color="success"
            onClick={onSave}
            sx={{ fontWeight: 'bold' }}
        >
            Save
        </Button>
    </Box>
);

export default KillSaveButtons;
