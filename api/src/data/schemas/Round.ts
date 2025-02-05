import dynamoose from 'dynamoose'

const schema = new dynamoose.Schema({
  tgPk: { type: String, required: true },
  tgSk: { type: String, required: true },
  
  // COURSE
  courseName: { type: String },
  courseRating: { type: Number },
  courseSlope: { type: Number },
  coursePar: { type: Number },
  score: { type: Number },

}, {
    timestamps: true,
  }
)

export default schema