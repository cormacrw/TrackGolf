import logger from '../utils/logger';
const register = (app) => {
    app.use('/', (err, req, res, next) => {
        logger.error(`[ERROR] ${err}`);
        res.sendStatus(500);
    });
};
export default { register };
