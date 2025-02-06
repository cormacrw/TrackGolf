import dynamoose from 'dynamoose'

const REGION = 'us-east-1'

if (process.env.ENV === 'local') {
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: REGION,
  })
  dynamoose.aws.ddb.set(ddb)
}
