import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function MuiTextField({ label, value, onChange }) {
    return (
        <Box sx={{ m: 1 }}>
            <TextField
                label={label}
                variant="outlined"
                value={value}
                onChange={onChange}
                fullWidth
            />
        </Box>
    );
}
