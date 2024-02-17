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
import { isValid } from 'date-fns';
const register = (router) => {
    router.get('/user/:userId/matches', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { limit, offset, sort, from, to, type } = req.query;
        if (from && !isValid(new Date(from))) {
            res.status(400).send({ message: 'INVALID_FROM_DATE' });
            return;
        }
        if (to && !isValid(new Date(to))) {
            res.status(400).send({ message: 'INVALID_TO_DATE' });
            return;
        }
        const matches = yield prisma.match.findMany({
            where: Object.assign({ userId: req.params.userId, createdAt: Object.assign(Object.assign({}, (to ? { lte: new Date(to) } : {})), (from ? { gte: new Date(from) } : {})) }, (type ? { type: type } : {})),
            orderBy: {
                createdAt: 'desc'
            },
            skip: offset ? Number(offset) : undefined,
            take: limit ? Number(limit) : undefined
        });
        res.send({ matches });
    }));
};
export default { register };
