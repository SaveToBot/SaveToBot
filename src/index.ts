import { CronJob } from 'cron'
import { listenToCommands } from './apps/telegram'
import { handleNewMentions } from './apps/twiiter'

function App() {
  listenToCommands()

  // every 2 minutes
  const job = new CronJob('* 0/2 * * * *', handleNewMentions)
  job.start()
}
App()
