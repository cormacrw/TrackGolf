import { Response } from 'express'
import { SessionRequest } from 'supertokens-node/framework/express'
import { DeleteItemCommand } from 'dynamodb-toolbox'
import Round from '@/data/entities/Round'

export const _delete = async (req: SessionRequest, res: Response) => {
  const userId = req.session!.getUserId()

  await Round.build(DeleteItemCommand)
    .key({ userId, roundId: req.params.id })
    .send()

  res.status(200).json({ success: true })
}
