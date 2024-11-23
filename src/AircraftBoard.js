import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import AircraftForm from './AircraftForm';

const AircraftBoard = () => {
  const [aircraftData, setAircraftData] = useState([]);

  useEffect(() => {
    // Establecer la conexión WebSocket
    const socket = new SockJS('http://localhost:8080/air-websocket');
    const stompClient = Stomp.over(socket);

    // Conexión al servidor
    stompClient.connect({}, () => {
      // Suscribirse al canal /topic/aircrafts
      stompClient.subscribe('/topic/aircrafts', (message) => {
        if (message.body) {
          const updatedAircraft = JSON.parse(message.body);

          setAircraftData((prevData) => {
            // Evitar duplicados y actualizar la información
            const updatedData = prevData.filter(
              (aircraft) => aircraft.flightNumber !== updatedAircraft.flightNumber
            );
            return [...updatedData, updatedAircraft];
          });
        }
      });

      // Desconectar al desmontar el componente
      return () => {
        stompClient.disconnect();
      };
    });
  }, []);

  return (
    <div>
      <AircraftForm />
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flight Number</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Altitude</TableCell>
              <TableCell>Speed</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aircraftData.map((aircraft, index) => (
              <TableRow key={index}>
                <TableCell>{aircraft.flightNumber}</TableCell>
                <TableCell>{aircraft.location}</TableCell>
                <TableCell>{aircraft.altitude} ft</TableCell>
                <TableCell>{aircraft.speed} km/h</TableCell>
                <TableCell>{aircraft.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AircraftBoard;
