const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)

import { Server } from 'socket.io'
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

type Point = { x: number; y: number }

type dispatch = {
  colIdx: number
  type: string
  id: string
}
interface boardType {
    board: [],
    currentPlayer: number,
    isGameOver: boolean,
    winner: null | number
  }
  

io.on('connection', (socket) => {
  socket.on('client-ready', () => {
    console.log('1')
  })

  socket.on('new-board', ({ type, colIdx, id }: dispatch) => {
    socket.broadcast.emit('update-board', {type, colIdx, id })
  })


})

server.listen(3001, () => {
  console.log('✔️ Server listening on port 3001')
})