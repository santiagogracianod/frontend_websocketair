import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const AircraftForm = () => {
  // Estados locales para los campos del formulario
  const [flightNumber, setFlightNumber] = useState('');
  const [location, setLocation] = useState('');
  const [altitude, setAltitude] = useState('');
  const [speed, setSpeed] = useState('');
  const [status, setStatus] = useState('');

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear conexión WebSocket
    const socket = new SockJS('http://localhost:8080/air-websocket');
    const stompClient = Stomp.over(socket);

    // Conectar y enviar datos del avión
    stompClient.connect({}, () => {
      const aircraftInfo = {
        flightNumber,
        location,
        altitude,
        speed,
        status,
      };

      // Enviar datos al canal del servidor
      stompClient.send('/app/updateAircraft', {}, JSON.stringify(aircraftInfo));

      // Limpiar los campos del formulario
      setFlightNumber('');
      setLocation('');
      setAltitude('');
      setSpeed('');
      setStatus('');
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Aircraft Information
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Flight Number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Location (lat, lon)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Altitude (ft)"
          value={altitude}
          onChange={(e) => setAltitude(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Speed (km/h)"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          margin="normal"
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add Aircraft
        </Button>
      </Box>
    </Container>
  );
};

export default AircraftForm;
