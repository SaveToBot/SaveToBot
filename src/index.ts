import { listenToCommands } from './apps/telegram'
import { handleNewMentions } from './apps/twiiter'

async function App() {
  listenToCommands()
  handleNewMentions()
}
App()
