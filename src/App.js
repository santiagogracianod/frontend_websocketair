import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Button, Box, Typography } from '@mui/material';
import GateBoard from './GateBoard';
import AircraftBoard from './AircraftBoard';

const App = () => {
  return (
    <Router>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Encabezado */}
        <Typography variant="h4" align="center" gutterBottom>
          Airport Control Panel
        </Typography>

        {/* Botones de navegación */}
        <Box display="flex" justifyContent="center" gap={2} sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/gate"
          >
            Gate Management
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/aircraft"
          >
            Aircraft Management
          </Button>
        </Box>

        {/* Rutas para las vistas */}
        <Routes>
          <Route path="/gate" element={<GateBoard />} />
          <Route path="/aircraft" element={<AircraftBoard />} />
          <Route
            path="/"
            element={<Typography align="center">Seleccione una opción</Typography>}
          />
        </Routes>

        {/* Pie de página */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Airport Control. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
