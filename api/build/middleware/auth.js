var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { verifier } from '../utils/jwtVerifier';
import logger from '../utils/logger';
const register = (router) => {
    router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info('IN AUTH');
        if (req.headers['x-api-token'] && req.headers['x-api-token'] === process.env.API_TOKEN) {
            logger.info('AUTH SUCCESS WITH API TOKEN');
            res.locals.email = process.env.API_USER_EMAIL;
            next();
            return;
        }
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            res.sendStatus(401);
            return;
        }
        const token = req.headers.authorization.split(' ')[1];
        logger.info('TOKEN: ' + token);
        try {
            const payload = yield verifier.verify(token);
            logger.info('JWT PAYLOAD:');
            logger.info(payload);
            res.locals.email = payload.email;
            next();
        }
        catch (error) {
            console.log(error);
            logger.error('AUTH FAILED');
            res.sendStatus(401);
        }
    }));
};
export default { register };
