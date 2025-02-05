import dynamoose from 'dynamoose'
import Round from './schemas/Round'
import User from './schemas/User'

export default dynamoose.model('trackgolf-dev-ddb', [Round, User])
