import readline from 'readline'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export default function connection (): Promise<Socket<DefaultEventsMap, DefaultEventsMap>> {
  return new Promise((resolve, reject) => {
    const socket = io('http://localhost:3000')

    socket.on('user:join', console.log)

    socket.on('message:client', (message, username) => {
      readline.moveCursor(process.stdout, 0, 0)
      readline.clearScreenDown(process.stdout)
      console.log(`${username}:`, message)
    })

    socket.on('connection', () => {
      resolve(socket)
    })

    setTimeout(() => {
      reject(new Error('Time out!'))
    }, 5000)
  })
}
