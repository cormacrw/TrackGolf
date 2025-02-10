import { Response } from 'express'
import { SessionRequest } from 'supertokens-node/framework/express'
import { QueryCommand } from 'dynamodb-toolbox'

import Table from '@/data/Table'
import Round from '@/data/entities/Round'

export const list = async (req: SessionRequest, res: Response) => {
  const { Items } = await Table.build(QueryCommand)
    .query({ partition: `user#${req.session!.getUserId()}`, range: { beginsWith: 'round#' } })
    .entities(Round)
    .options({})
    .send()
  
  res.status(200).json({ rows: Items, count: Items?.length })
}
