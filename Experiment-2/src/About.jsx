import React, { useState } from 'react';
import MuiSelect from './components/MuiSelect';
import Box from '@mui/material/Box';

export default function About() {
    const [country, setCountry] = useState('');
    const options = [{ value: 'IN', label: 'India' }, { value: 'US', label: 'USA' }, { value: 'UK', label: 'UK' }];

    return (
        <Box sx={{ p: 2 }}>
            <h2>About Page</h2>
            <p>Select your location:</p>
            <MuiSelect
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                options={options}
            />
        </Box>
    );
}
