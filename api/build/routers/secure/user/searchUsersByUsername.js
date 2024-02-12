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
    router.get('/users/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { query } = req.query;
        if (!query) {
            res.status(400).send({ message: 'NO_QUERY' });
            return;
        }
        const qry = query;
        if (qry.length < 4) {
            res.status(400).send({ message: 'QUERY_TOO_SHORT' });
            return;
        }
        const matches = yield prisma.user.findMany({
            where: {
                username: {
                    contains: qry,
                    mode: 'insensitive'
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.send({ matches });
    }));
};
export default { register };
