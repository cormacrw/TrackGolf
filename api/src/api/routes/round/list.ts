import { Response } from 'express'
import { SessionRequest } from 'supertokens-node/framework/express'
import Table from '../../../data/Table'

export const list = async (req: SessionRequest, res: Response) => {
  const rounds = await Table.query()
    .where('tgPk').eq(`user#${req.session!.getUserId()}`)
    .and()
    .where('tgSk').beginsWith('round#')
    .exec()

  res.status(200).json({ rows: rounds, count: rounds.length })
}
