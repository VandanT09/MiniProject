import { Server } from 'socket.io'

const PORT = 9000
const io = new Server(PORT, {
  cors: {
    origin: "*"
  }
})


let users = []
const addUser = (userData, socketId) => {
  !users.some(user => user.sub == userData.sub) && users.push({ ...userData, socketId })
}
const getUser = (userId) => {
  return users.find(user => user.sub === userId)
}

io.on("connection", (socket) => {
  console.log("User connected successfully")

  socket.on('addUsers', userData => {
    addUser(userData, socket.id)
    io.emit('getUsers', users)
  })

  socket.on('sendMessage', data => {
    const user = getUser(data.receiverId)
    io.to(user.socketId).emit("getMessage", data)
  })
})