import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { format, sub } from 'date-fns'

export const DATE_FILTERS = [
  'All time',
  'Past 24 hours',
  'Past week',
  'Past month',
  'Past year'
]

/**
 * Model description here for TypeScript hints.
 */
export const FilterStoreModel = types
  .model("FilterStore")
  .props({
    from: types.string,
    timeframe: types.string,
    to: types.string,
    type: types.string
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setType (type: string) {
      self.setProp('type', type)
    },
    setTimeframe (timeframe: string) {
      self.setProp('timeframe', timeframe)
      switch (timeframe) {
        case 'All time':
          self.setProp('from', '2000-01-01')
          break
        case 'Past 24 hours':
          self.setProp('from', format(sub(new Date(), { days: 1 }), 'yyyy-MM-dd'))
          break
        case 'Past week':
          self.setProp('from', format(sub(new Date(), { weeks: 1 }), 'yyyy-MM-dd'))
          break
        case 'Past month':
          self.setProp('from', format(sub(new Date(), { months: 1 }), 'yyyy-MM-dd'))
          break
        case 'Past year':
          self.setProp('from', format(sub(new Date(), { years: 1 }), 'yyyy-MM-dd'))
          break
      } 
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface FilterStore extends Instance<typeof FilterStoreModel> {}
export interface FilterStoreSnapshotOut extends SnapshotOut<typeof FilterStoreModel> {}
export interface FilterStoreSnapshotIn extends SnapshotIn<typeof FilterStoreModel> {}
export const createFilterStoreDefaultModel = () => ({
  from: '2000-01-01',
  to: format(new Date(), 'yyyy-MM-dd'),
  type: 'all',
  timeframe: 'All time'
})
