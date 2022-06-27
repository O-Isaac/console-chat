import { Server } from 'socket.io'
import consola from 'consola'

import connection from './events/connection'

const io = new Server()

try {
  io.on('connection', (socket) => connection({ server: io, socket }))

  io.listen(3000)

  consola.success('Server listening on port', '3000')
} catch (error: any) {
  consola.error(error.message)
}
