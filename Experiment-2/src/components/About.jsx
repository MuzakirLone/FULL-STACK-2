import { Box, Typography, Grid, Paper, Divider } from "@mui/material";

function About() {
  return (
    <Box sx={{ p: 4, background: "linear-gradient(135deg, #f0f4f8, #d9e4ec)", minHeight: "100vh" }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h3" align="center" sx={{ fontWeight: "bold", color: "#2a5298", mb: 2 }}>
            About RealtyHub
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ color: "#555" }}>
            Your trusted partner in real estate
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Our Story
            </Typography>
            <Typography variant="body1" sx={{ color: "#444", mb: 2 }}>
              RealtyHub was founded with a vision to simplify property buying and selling. We connect buyers with their dream homes and investors with profitable opportunities.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" sx={{ color: "#777" }}>
              Integrity • Innovation • Trust
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ color: "#444", mb: 2 }}>
              To empower families and investors with transparent, reliable, and personalized real estate solutions.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default About;
