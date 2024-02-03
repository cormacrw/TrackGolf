var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from '../../../db/client';
import BadWordFilter from 'bad-words';
const register = (router) => {
    router.put('/user/:userId/username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const { username } = req.body;
            // TODO check that user has the same email as whats in the id token
            const user = yield prisma.user.findFirst({ where: { id: userId } });
            if (!user) {
                res.status(400).send({
                    message: 'INVALID_USER'
                });
                return;
            }
            if (user.username === username) {
                res.status(400).send({
                    message: 'USERNAME_ALREADY_SET'
                });
                return;
            }
            const usernameUser = yield prisma.user.findFirst({ where: { username } });
            if (usernameUser) {
                res.status(400).send({
                    message: 'USERNAME_EXISTS'
                });
                return;
            }
            const filter = new BadWordFilter();
            if (filter.isProfane(username)) {
                res.status(400).send({
                    message: 'USERNAME_IS_PROFANE'
                });
                return;
            }
            if (username.length > 32) {
                res.status(400).send({
                    message: 'USERNAME_TOO_LONG'
                });
                return;
            }
            yield prisma.user.update({
                where: { id: userId },
                data: { username }
            });
            res.send({ success: true });
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }));
};
export default { register };
