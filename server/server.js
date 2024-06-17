import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let connectedUsers = 0;

io.on("connection", (socket) => {
  //connectedUsers++;
  //io.emit('update_user_count', connectedUsers);
  console.log('A user connected, ID:', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data.room_id);
    console.log(`This User: ${data.username} [ ENTER ROOM ] -> ${data.room_id}`);
  });

  socket.on("send_message", (data) => {
    console.log("Message received on server:", data);
    socket.to(data.room_id).emit("receive_message", data);
  });

  socket.on('disconnect', () => {
    //connectedUsers--;
    //io.emit('update_user_count', connectedUsers);
    console.log('A user disconnected, ID:', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
