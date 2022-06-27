import readline from 'readline'
import username from './events/client/username'
import icons from './icons'

const ChatController = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

ChatController.on('SIGINT', () => {
  console.clear()
  console.log(icons.info, 'Leaving...')

  ChatController.close()
  process.exit(0)
})

username({ ChatController })
