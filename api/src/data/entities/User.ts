import { Entity, schema, attribute } from 'dynamodb-toolbox'
import Table from '../Table'
export default new Entity({
  name: 'User',
  table: Table,
  schema: schema({
    userId: attribute.string().key(),
    username: attribute.string().optional(),
    email: attribute.string().required(),
    isActive: attribute.boolean().required().default(true),
  }),
  computeKey: (keyInput) => {
    return {
      tgPk: `user#${keyInput.userId}`,
      tgSk: 'data',
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