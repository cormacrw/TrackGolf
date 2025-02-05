import dynamoose from 'dynamoose'

const schema = new dynamoose.Schema({
  tgPk: { type: String, required: true, hashKey: true },
  tgSk: { type: String, required: true, rangeKey: true },
  
  // COURSE
  courseName: { type: String },
  coursePar: { type: Number },
  courseLength: { type: Number },

  roundDate: { type: String },
  roundScore: { type: Number },
  roundPutts: { type: Number },
  fairwayPercentage: { type: Number },
  greenPercentage: { type: Number },
}, {
    timestamps: true,
  }
)

export default schema