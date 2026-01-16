import { Box, Typography, Container, Grid, Card, CardContent, CardMedia } from "@mui/material";

const properties = [
  { name: "Luxury Apartment", price: "120,000 Credits", image: "https://via.placeholder.com/300x200?text=Luxury+Apartment" },
  { name: "Modern Villa", price: "250,000 Credits", image: "https://via.placeholder.com/300x200?text=Modern+Villa" },
  { name: "City Penthouse", price: "300,000 Credits", image: "https://via.placeholder.com/300x200?text=City+Penthouse" },
  { name: "Cozy Cottage", price: "80,000 Credits", image: "https://via.placeholder.com/300x200?text=Cozy+Cottage" }
];

function Properties() {
  return (
    <Box sx={{ py: 6, background: "linear-gradient(135deg, #fff, #f9f9f9)" }}>
      <Container maxWidth="lg">
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography variant="h3" fontWeight="bold" color="primary">
            Featured Properties
          </Typography>
          <Typography color="text.secondary">Explore our curated listings</Typography>
        </Box>
        <Grid container spacing={4}>
          {properties.map((property, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card elevation={6} sx={{ borderRadius: 3 }}>
                <CardMedia component="img" height="160" image={property.image} alt={property.name} />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">{property.name}</Typography>
                  <Typography variant="body1" color="text.secondary">{property.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Properties;
