import app from './app/app'
import logger from './utils/logger'

const PORT = 3000

logger.info('Starting server on port ' + PORT + '...')
app.listen(3000)