import { Entity, schema, attribute } from 'dynamodb-toolbox'
import Table from '../Table'
import { v4 as uuidv4 } from 'uuid'

export default new Entity({
  name: 'Round',
  table: Table,
  schema: schema({
    roundId: attribute.string().key().default(() => uuidv4()),
    userId: attribute.string().key(),
    courseName: attribute.string().required(),
    courseLength: attribute.number().required(),
    coursePar: attribute.number().required(),
    notes: attribute.string().optional(),
    greenPercentage: attribute.number().optional(),
    fairwayPercentage: attribute.number().optional(),
    score: attribute.number().required(),
    putts: attribute.number().optional(),
    date: attribute.number().required(),
    type: attribute.string().required()
  }),
  computeKey: (keyInput) => {
    return {
      tgPk: `user#${keyInput.userId}`,
      tgSk: `round#${keyInput.roundId}`,
    }
  },
  timestamps: {
    modified: {
      name: 'updatedAt',
    },
    created: {
      name: 'createdAt',
    }
  },
})