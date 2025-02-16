import { Response } from 'express'
import { SessionRequest } from 'supertokens-node/framework/express'
import { QueryCommand } from 'dynamodb-toolbox'

import Table from '@/data/Table'
import User from '@/data/entities/User'

export const get = async (req: SessionRequest, res: Response) => {
  const { Items } = await Table.build(QueryCommand)
    .query({ partition: `user#${req.session!.getUserId()}`, range: { eq: 'data' } })
    .entities(User)
    .options({
      limit: 1,
    })
    .send()

  console.log(req.session!.getUserId())

  if (!Items?.length) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  res.status(200).json({ user: Items[0] })
}
