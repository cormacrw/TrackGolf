import { AttributeValue, DynamoDBClient, PutItemCommand, QueryCommand, ScanCommand } from '@aws-sdk/client-dynamodb'
import { dataToItem, itemToData } from 'dynamo-converters'
import { EntityI } from './EntityI'

const TABLE_NAME = 'TrackUTTable'

export default class TrackUTTable {
  static conn: DynamoDBClient

  static getConnection (): DynamoDBClient {
    if (!this.conn) {
      this.connect()
    }
    return this.conn
  }

  static connect () {
    this.conn = new DynamoDBClient({
      region: 'us-east-1'
    })
  }

  static async putItem (input: EntityI) {
    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: dataToItem(input)
    })

    await this.getConnection().send(command)
  }

  static async scan (filterExpression: string, expressionValues: Record<string, AttributeValue>) {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: filterExpression,
      ExpressionAttributeValues: expressionValues
    })
    const res = await this.getConnection().send(command)

    return this.itemsToData(res.Items || [])
  }

  static async queryPKBeginsWithSK (pk: string, skBeginsWith: string) {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'tutPk = :pk AND begins_with(tutSk, :sk)',
      ExpressionAttributeValues: { ':pk': { S: pk }, ':sk': { S: skBeginsWith } }
    })
    const res = await this.getConnection().send(command)
    
    return this.itemsToData(res.Items || [])
  }

  static itemsToData (items: Record<string, AttributeValue>[]) {
    return items.map(item => itemToData(item))
  }
}