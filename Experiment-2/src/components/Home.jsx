import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SearchIcon from "@mui/icons-material/Search";

function Home() {
  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)", p: 4 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h2" sx={{ fontWeight: "bold", color: "#2a5298", mb: 2 }}>
            Find Your Dream Home
          </Typography>
          <Typography variant="h6" sx={{ color: "#444", mb: 4 }}>
            Explore premium properties tailored to your lifestyle and budget.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              size="large"
              variant="contained"
              startIcon={<SearchIcon />}
              component={Link}
              to="/properties"
              sx={{ backgroundColor: "#2a5298" }}
            >
              Browse Properties
            </Button>
            <Button
              size="large"
              variant="outlined"
              startIcon={<HomeWorkIcon />}
              component={Link}
              to="/contact"
            >
              Get Consultation
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <img
              src="https://via.placeholder.com/600x400?text=Luxury+Apartment"
              alt="Luxury Apartment"
              style={{ width: "100%", height: "auto" }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
