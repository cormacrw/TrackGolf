import { gql } from '@apollo/client'
import { SignInGoogleUser } from '../publicSchema'

export const SIGN_IN_GOOGLE_USER = gql`
    mutation SignInGoogleUser ($email: String!, $googleId: String!) {
        signInGoogleUser(email: $email, googleId: $googleId) {
            auth {
                accessToken
                refreshToken
            }
            user {
                email
                googleId
                tutPk
                tutSk
                userId
                username
            }
        }
    }
`

export type SignInGoogleUserResponse = {
    signInGoogleUser: SignInGoogleUser
}