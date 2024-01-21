import { User } from '../schema/secure/types/schema'
import jwt from 'jsonwebtoken'

const SECRET = 'CORMACS_SECRET'

export default class AuthModel {
  static createTokens (user: User) {
    const accessToken = jwt.sign(
    {
      userId: user.userId,
      email: user.email
    },
    SECRET,
    {
      expiresIn: '1h'
    })

    const refreshToken = jwt.sign({
      userId: user.userId,
      email: user.email
    },
    SECRET,
    {
      expiresIn: '30d'
    })

    return {
      accessToken,
      refreshToken
    }
  }

  static verifyToken (token: string) {

  }
}