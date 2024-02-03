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
/**
 * Check if user exists if not create them
 * @param router
 */
const register = (router) => {
    router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.findFirst({ where: { email: res.locals.email } });
        if (user) {
            res.send({ user });
        }
        else {
            const newUser = yield prisma.user.create({ data: { email: res.locals.email } });
            res.send({ user: newUser });
        }
    }));
};
export default { register };
