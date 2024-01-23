import { MatchResult } from 'app/components/wizard/questions/result/MatchResult'
import { MatchType } from 'app/components/wizard/questions/type/MatchType'

export default [
  {
    name: 'TYPE',
    component: MatchType
  },
  {
    name: 'RESULT',
    component: MatchResult
  }
]