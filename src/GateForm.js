import React, {useState} from 'react'
import  {Button, Container, TextField, Typography, Box} from '@mui/material'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

const GateForm = () => {
  //definir los estados locales  para los campos del formulario

  const [gate, setGate] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [status, setStatus] = useState('');

  //funcion que se va a ejecutar al momento de enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    //creamos una conexios websocket
    const socket = new SockJS("http://localhost:8080/air-websocket")
    const stompClient = Stomp.over(socket) //protocolo stomp sobre la conexion ws

    //stom utiliza comandos
    stompClient.connect({}, () => {
      //objeto que contiene la información de la puerta a enviar
      const gateInfo = {
        gate,
        flightNumber,
        destination,
        departureTime,
        status
      }

      //envie el gateInfo al servidor a traves del canal app/updateGate
      stompClient.send('/app/updateGate', {}, JSON.stringify(gateInfo))

    })
  }


  return (
    <Container maxWidth="sm">
      <Typography variant='h4' align='center' gutterBottom>
        Update Gate Information
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt:3}}>
        <TextField
          fullWidth
          label="Gate"
          value={gate}
          onChange={(e) => setGate(e.target.value)}
          margin='normal'
        />
        <TextField
          fullWidth
          label="Flight Number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          margin='normal'
        />
        <TextField
          fullWidth
          label="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          margin='normal'
        />
        <TextField
          fullWidth
          label="Departure Time"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
          margin='normal'
        />
        <TextField
          fullWidth
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          margin='normal'
        />

        <Button type='submit' fullWidth variant='contained' sx={{mt:3, mb:2}}>
          Update Gate 
        </Button>
      </Box>
    </Container>
  )
}

export default GateForm
