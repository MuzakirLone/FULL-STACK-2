import { AppBar, Toolbar, Button, Container } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Properties from "./components/Properties";
import Services from "./components/Services";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      {/* Top Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#2a5298" }}>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/properties">Properties</Button>
          <Button color="inherit" component={Link} to="/services">Services</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
