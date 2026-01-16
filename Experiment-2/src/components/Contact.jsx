import { Box, Typography, TextField, Button, Grid, Paper, Divider } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";

function Contact() {
  return (
    <Box sx={{ p: 4, background: "linear-gradient(135deg, #e3f2fd, #bbdefb)", minHeight: "100vh" }}>
      <Typography variant="h3" align="center" sx={{ fontWeight: "bold", mb: 4, color: "#0d47a1" }}>
        Get in Touch
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Contact Info Section */}
        <Grid item xs={12} md={5}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Contact Information
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Email sx={{ mr: 2, color: "#0d47a1" }} />
              <Typography variant="body1">info@example.com</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Phone sx={{ mr: 2, color: "#0d47a1" }} />
              <Typography variant="body1">+91 98765 43210</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOn sx={{ mr: 2, color: "#0d47a1" }} />
              <Typography variant="body1">123 Business Street, City, Country</Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body2" sx={{ color: "#555" }}>
              We’d love to hear from you! Reach out with any questions or feedback.
            </Typography>
          </Paper>
        </Grid>

        {/* Contact Form Section */}
        <Grid item xs={12} md={7}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Send Us a Message
            </Typography>
            <TextField fullWidth label="Your Name" margin="normal" />
            <TextField fullWidth label="Your Email" margin="normal" />
            <TextField fullWidth label="Subject" margin="normal" />
            <TextField fullWidth label="Message" margin="normal" multiline rows={5} />
            <Button variant="contained" sx={{ mt: 3, backgroundColor: "#0d47a1" }}>
              Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Contact;
