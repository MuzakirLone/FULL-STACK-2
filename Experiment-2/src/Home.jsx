import React, { useState } from 'react';
import MuiButton from './components/MuiButton';
import MuiTextField from './components/MuiTextField';
import MuiCheckbox from './components/MuiCheckbox';
import Box from '@mui/material/Box';

export default function Home() {
    const [name, setName] = useState('');
    const [accepted, setAccepted] = useState(false);

    return (   
        <Box sx={{ p: 2 }}>
            <h2>Home Page</h2>
            <MuiTextField label="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
            <MuiCheckbox label="I accept terms" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
            <MuiButton text="Submit" onClick={() => alert(`Hello ${name}`)} variant="contained" />
        </Box>
    );
}
