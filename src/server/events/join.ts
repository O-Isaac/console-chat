import { Server } from 'socket.io'

export default function Join (server: Server, username: string) {
  server.emit('user:join', `${username} has enter the chat!`)
}
