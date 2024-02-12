import 'dotenv/config';
import app from './app/app';
import logger from './utils/logger';
const PORT = process.env.PORT || 3000;
logger.info('Starting server on port ' + PORT + '...');
app.listen(PORT);
