
// server.js
const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();
// connection is start
io.on("connection", (socket) => {
   // Join the room 
    socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    // other user is joined 
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    //room in join 
    io.to(socket.id).emit("room:join", data);
});

  // user Call 
  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });



  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on("room:leave", () => {
    const room = socketidToEmailMap.get(socket.id);
    socket.leave(room);
    socketidToEmailMap.delete(socket.id);
    emailToSocketIdMap.delete(room);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
});

socket.on('chat message', (message) => {
  
  // Check if the message sender's email matches the email associated with the current socket ID
      io.emit('chat message', message);
});

  
  
  
});