import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function MuiRating({ value, onChange }) {
    return (
        <Box component="fieldset" mb={3} borderColor="transparent" sx={{ m: 1 }}>
            <Typography component="legend">Rate Us</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    onChange(newValue);
                }}
            />
        </Box>
    );
}
