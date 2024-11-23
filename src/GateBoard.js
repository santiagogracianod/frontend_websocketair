import React, {useState, useEffect} from 'react'
import  {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import GateForm from './GateForm.js'


const GateBoard = () => {

  const [gateData, setGateData] = useState([]);

  useEffect(() => {
    //establecer la conexion WS
    const socket = new SockJS('http://localhost:8080/air-websocket')
    const stompClient = Stomp.over(socket) //protocolo stomp sobre la conexion ws

    //conexion al servidor
    stompClient.connect({}, ()=> {
      //subscribirse al canal topip/gates  para recibir actualizaciones en tiempo real
      stompClient.subscribe('/topic/gates', (message) => {
        if (message.body) {
          const updateGate = JSON.parse(message.body)

          setGateData(prevData => {
            //filtre los datos anteriores para evitar duplicados y agregar la nueva informacion
            const updatedData = prevData.filter(data => data.gate !== updateGate.gate)
            return [... updatedData, updateGate] //añadir la nueva puerta actualizada al estado
          })
        }
      })

      //desconectar del WS cuando el componente se desmonta
      return() => {
        stompClient.disconnect()
      }
    })
  }, [])


  return (
    <div>
      <GateForm/>
        <TableContainer component={Paper} sx={{mt:3}}>
          <Table>
            <TableHead>
              <TableCell>Gate</TableCell>
              <TableCell>Flight Number</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Status</TableCell>
            </TableHead>
            <TableBody>
              {gateData.map((gateInfo, index) => (
                <TableRow key={index}>
                  <TableCell> {gateInfo.gate} </TableCell>
                  <TableCell> {gateInfo.flightNumber} </TableCell>
                  <TableCell> {gateInfo.destination} </TableCell>
                  <TableCell> {gateInfo.departureTime} </TableCell>
                  <TableCell> {gateInfo.status} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      
    </div>
  )
}

export default GateBoard
