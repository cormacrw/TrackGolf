import { Response } from 'express'
import { SessionRequest } from 'supertokens-node/framework/express'
import Table from '../../../data/Table'
import { v4 as uuidv4 } from 'uuid'

export const create = async (req: SessionRequest, res: Response) => {
  const round = await Table.create({
    tgPk: `user#${req.session!.getUserId()}`,
    tgSk: `round#${uuidv4()}`,
    ...req.body
  })

  res.status(200).json({ success: true, round })
}
