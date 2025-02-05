import dynamoose from 'dynamoose'

const schema = new dynamoose.Schema({
  tgPk: { type: String, required: true, hashKey: true },
  tgSk: { type: String, required: true, rangeKey: true },
  
  userId: { type: String },
  username: { type: String },
  email: { type: String },
}, {
    timestamps: true,
  }
)

export default schema