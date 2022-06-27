import { Socket } from 'socket.io-client'
import readline, { Interface } from 'readline'

interface Props {
    socket: Socket,
    ChatController: Interface,
    username: string
}

export function send (props: Props) {
  const { ChatController, username, socket } = props

  ChatController.question('', (message) => {
    readline.moveCursor(process.stdout, 0, -1)
    readline.clearScreenDown(process.stdout)

    socket.emit('message', message, username)
    send(props)
  })
}
