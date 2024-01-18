import ExpectedGoalsQuestion from '../../components/wizard/questions/ExpectedGoals'
import ScoreQuestion from '../../components/wizard/questions/Score'
import TypeQuestion from '../../components/wizard/questions/Type'

export default [
  {
    name: 'TYPE',
    component: TypeQuestion
  },
  {
    name: 'SCORE',
    component: ScoreQuestion
  },
  {
    name: 'XG',
    component: ExpectedGoalsQuestion
  },
  {
    name: 'POSSESSION',
    component: ExpectedGoalsQuestion
  },
  {
    name: 'SHOTS',
    component: ExpectedGoalsQuestion
  },
  {
    name: 'PENALTIES',
    component: ExpectedGoalsQuestion
  },
  {
    name: 'CARDS',
    component: ExpectedGoalsQuestion
  },
  {
    name: 'SCORERS',
    component: ExpectedGoalsQuestion
  },
  {
    name: 'ASSISTS',
    component: ExpectedGoalsQuestion
  },
  {
    name: 'NOTES',
    component: ExpectedGoalsQuestion
  },
]