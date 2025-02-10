import { Table } from 'dynamodb-toolbox'
import client from './client'

export default new Table({
  name: process.env.DYNAMODB_TABLE_NAME!,
  documentClient: client,
  partitionKey: {
    name: 'tgPk',
    type: 'string',
  },
  sortKey: {
    name: 'tgSk',
    type: 'string',
  },
})
