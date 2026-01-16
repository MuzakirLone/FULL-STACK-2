import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import SearchIcon from "@mui/icons-material/Search";
import HandshakeIcon from "@mui/icons-material/Handshake";

function Services() {
  const services = [
    {
      icon: <BusinessIcon sx={{ fontSize: 50, color: "#2a5298" }} />,
      title: "Property Sales",
      description: "Helping you buy and sell residential and commercial properties with ease."
    },
    {
      icon: <SearchIcon sx={{ fontSize: 50, color: "#f57c00" }} />,
      title: "Property Search",
      description: "Browse curated listings to find apartments, villas, and plots that fit your lifestyle."
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 50, color: "#388e3c" }} />,
      title: "Consultation",
      description: "Expert advice on investments, mortgages, and legal documentation for real estate deals."
    }
  ];

  return (
    <Grid container spacing={4} sx={{ py: 6 }}>
      {services.map((service, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card
            elevation={6}
            sx={{
              borderRadius: 3,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #f5f7fa, #e3f2fd)"
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Box sx={{ mb: 2 }}>{service.icon}</Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {service.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {service.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Services;
