import { Server } from 'socket.io'

export default function Message (server: Server, msg: string, username: string) {
  server.emit('message:client', msg, username)
}
