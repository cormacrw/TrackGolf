import { Response } from 'express'
import { SessionRequest } from 'supertokens-node/framework/express'
import { PutItemCommand } from 'dynamodb-toolbox'
import Round from '@/data/entities/Round'

export const create = async (req: SessionRequest, res: Response) => {
  await Round.build(PutItemCommand)
    .item({
      ...req.body,
      userId: req.session!.getUserId(),
    })
    .send()

  res.status(200).json({ success: true })
}
