import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Navbar() {
  return (
    <AppBar position="sticky" sx={{ background: "linear-gradient(90deg, #1e3c72, #2a5298)" }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          RealtyHub
        </Typography>
        <Box>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Properties</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">Contact</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
