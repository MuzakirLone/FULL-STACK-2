import Button from '@mui/material/Button';

export default function MuiButton({ text, onClick, variant = "contained", color = "primary" }) {
  return (
    <Button variant={variant} color={color} onClick={onClick} sx={{ m: 1 }}>
      {text}
    </Button>
  );
}
