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
    router.post('/matches', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { match } = req.body;
        if (!match) {
            res.sendStatus(400);
            return;
        }
        const newMatch = yield prisma.match.create({
            data: match
        });
        res.send({
            match: newMatch
        });
    }));
};
export default { register };
