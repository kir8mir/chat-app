import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `https://kir8mir-chat-server.herokuapp.com:${PORT}`,
    methods: ["GET", "POST"],
  }
})

io.on('connection', (socket) => {
  console.log(`User connected - ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User: ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('res_message', data)
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
})

server.listen(PORT, () => {
  console.log('Server is running!');
});