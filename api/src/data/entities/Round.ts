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
    putts: attribute.number().optional(), // deprecated

    shortPuttAccuracy: attribute.number().optional(),
    mediumPuttAccuracy: attribute.number().optional(),
    longPuttAccuracy: attribute.number().optional(),

    aces: attribute.number().optional(),
    albatrosses: attribute.number().optional(),
    eagles: attribute.number().optional(),
    birdies: attribute.number().optional(),
    pars: attribute.number().optional(),
    bogeys: attribute.number().optional(),
    bogeysPlus: attribute.number().optional(),

    proximityToHole: attribute.number().optional(),
    birdieConversion: attribute.number().optional(),

    enableStats: attribute.boolean().default(true).optional(),

    date: attribute.number().required(),
    type: attribute.string().required(),
    tour: attribute.string().optional(),
    difficulty: attribute.string().optional()
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