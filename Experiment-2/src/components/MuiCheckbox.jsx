import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

export default function MuiCheckbox({ label, checked, onChange }) {
    return (
        <Box sx={{ m: 1 }}>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={onChange} />}
                label={label}
            />
        </Box>
    );
}
