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
interface userType {
  username: string,
  image: string,
}

io.on('connection', (socket) => {
  socket.on('client-ready', () => {
    console.log('1')
  })
  socket.on('join-lobby', ({username, image}: userType) => {
    console.log(username,image)
    socket.join("room1")
    socket.to('room1').except(socket.id).emit('receive-user', {username, image})
  })
  socket.on('new-board', ({ type, colIdx, id }: dispatch) => {
    socket.broadcast.emit('update-board', {type, colIdx, id })
  })


})

server.listen(3001, () => {
  console.log('✔️ Server listening on port 3001')
})