import { MatchSummary } from 'app/components/wizard/MatchSummary'
import { MatchCards } from 'app/components/wizard/questions/cards/MatchCards'
import { MatchMinutes } from 'app/components/wizard/questions/minutes/MatchMinutes'
import { MatchPenalties } from 'app/components/wizard/questions/penalties/MatchPenalties'
import { MatchPossession } from 'app/components/wizard/questions/possession/MatchPossession'
import { MatchResult } from 'app/components/wizard/questions/result/MatchResult'
import { MatchShots } from 'app/components/wizard/questions/shots/MatchShots'
import { MatchType } from 'app/components/wizard/questions/type/MatchType'
import { MatchXG } from 'app/components/wizard/questions/xg/MatchXG'
import { WizardStore } from 'app/models'

export default [
  {
    name: 'TYPE',
    component: MatchType,
    showNext: (wizard: WizardStore) => {
      return !!wizard.type
    }
  },
  {
    name: 'RESULT',
    component: MatchResult,
    showNext: (wizard: WizardStore) => { // eslint-disable-line @typescript-eslint/no-unused-vars
      return true
    }
  },
  {
    name: 'MINUTES',
    component: MatchMinutes,
    showNext: (wizard: WizardStore) => { // eslint-disable-line @typescript-eslint/no-unused-vars
      return true
    }
  },
  {
    name: 'POSSESSION',
    component: MatchPossession,
    showNext: (wizard: WizardStore) => { // eslint-disable-line @typescript-eslint/no-unused-vars
      return true
    }
  },
  {
    name: 'SHOTS',
    component: MatchShots,
    showNext: (wizard: WizardStore) => { // eslint-disable-line @typescript-eslint/no-unused-vars
      return true
    }
  },
  {
    name: 'XG',
    component: MatchXG,
    showNext: (wizard: WizardStore) => { // eslint-disable-line @typescript-eslint/no-unused-vars
      return true
    }
  },
  {
    name: 'PENALTIES',
    component: MatchPenalties,
    showNext: (wizard: WizardStore) => { // eslint-disable-line @typescript-eslint/no-unused-vars
      return true
    }
  },
  {
    name: 'CARDS',
    component: MatchCards,
    showNext: (wizard: WizardStore) => { // eslint-disable-line @typescript-eslint/no-unused-vars
      return true
    }
  },
  {
    name: 'SUMMARY',
    component: MatchSummary,
    showNext: (wizard: WizardStore) => { // eslint-disable-line @typescript-eslint/no-unused-vars
      return true
    }
  }
]