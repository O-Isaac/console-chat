import { Server, Socket } from 'socket.io'
import consola from 'consola'

import Join from './join'
import Message from './message'

const users = new Map()

interface ConnectionProps {
    socket: Socket
    server: Server
}

/**
 * Socket event connection
 * @see https://socket.io/docs/v4/server-instance/#connection
 */
export default function connection (props: ConnectionProps): void {
  const { socket, server } = props

  consola.info('New user connected to server', socket.id)

  socket.on('client:user:join', (username) => {
    users.set(socket.id, username)
    Join(server, username)
  })

  socket.on('client:user:avalible', (username) => {
    const isAvalible = [...users.values()].includes(username)

    socket.emit('server:user:avalible', isAvalible)
  })

  socket.on('disconnect', () => {
    const username = users.get(socket.id)

    if (username) {
      server.emit('user:join', `${username} has left the chat`)
      users.delete(socket.id)
    }
  })

  socket.on('message', (msg, username) => Message(server, msg, username))

  socket.emit('connection', 'Welcome to server')
}
