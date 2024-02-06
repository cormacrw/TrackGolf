import 'dotenv/config';
import app from './app/app';
import logger from './utils/logger';
logger.info('PROCESS.ENV ' + JSON.stringify(process.env));
const PORT = process.env.PORT || 3000;
logger.info('Starting server on port ' + PORT + '...');
app.listen(PORT);
