import { Response } from 'express'
import { SessionRequest } from 'supertokens-node/framework/express'
import Table from '../../../data/Table'
import { Condition } from 'dynamoose'

export const get = async (req: SessionRequest, res: Response) => {
    
  const user = await Table.query()
    .where('tgPk').eq(`user#${req.session!.getUserId()}`)
    .and()
    .where('tgSk').eq(`user#${req.session!.getUserId()}`)
    .exec()

  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  res.status(200).json({ user: user[0] })
}
