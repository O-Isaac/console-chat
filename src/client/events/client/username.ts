import readline, { Interface } from 'readline'

import icons from '../../icons'
import connection from './connection'
import { send } from './message'

interface UsernamePromptProp {
    ChatController: Interface
}

export default function UsernamePrompt (props: UsernamePromptProp) {
  const { ChatController } = props

  ChatController.question(icons.info + ' Please type your temp username: ', async (username) => {
    try {
      readline.moveCursor(process.stdout, 0, -1)
      readline.clearScreenDown(process.stdout)

      console.info(icons.info, 'Connecting to server...')

      const socket = await connection()

      readline.moveCursor(process.stdout, 0, -1)
      readline.clearScreenDown(process.stdout)

      if (!socket) {
        console.log(icons.error, 'socket client not found!')
        process.exit(1)
      }

      socket.emit('client:user:avalible', username)

      socket.on('server:user:avalible', (isAvalible) => {
        console.log(isAvalible)
        if (!isAvalible) {
          console.log(icons.success, 'Your username is', username)
          console.log(icons.info, 'Start typing to chat with other people!')
          console.log('')

          socket.emit('client:user:join', (username))

          send({ ChatController, username, socket })
        } else {
          console.log(icons.error, username, 'is taked please use other username')
          socket.disconnect()
          UsernamePrompt(props)
        }
      })
    } catch (error: any) {
      readline.moveCursor(process.stdout, 0, -1)
      readline.clearScreenDown(process.stdout)

      console.log(icons.error, error.message)
    }
  })
}
