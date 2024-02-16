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
const register = (router) => {
    router.get('/user/:userId/following', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const following = yield prisma.follow.findMany({
            where: {
                userId: req.params.userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                followedUser: true
            }
        });
        res.send({ following });
    }));
};
export default { register };
