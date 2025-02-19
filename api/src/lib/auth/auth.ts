import supertokens from "supertokens-node"
import Session from "supertokens-node/recipe/session"
import EmailPassword from "supertokens-node/recipe/emailpassword"
import Dashboard from "supertokens-node/recipe/dashboard"
import EmailVerification from "supertokens-node/recipe/emailverification"
import User from "@/data/entities/User"
import { PutItemCommand } from 'dynamodb-toolbox'
import logger from "@/logger"

export const init = () => {
  logger.info('Initializing Supertokens...')
  supertokens.init({
    framework: "express",
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI!,
      apiKey: process.env.SUPERTOKENS_API_KEY!
    },
    appInfo: {
      appName: "eGolfTracker",
      apiDomain: process.env.PUBLIC_API_URL!,
      websiteDomain: process.env.CLIENT_CORS_ORIGIN!,
      apiBasePath: "/auth",
      websiteBasePath: "/auth",
    },
    recipeList: [
      EmailPassword.init({
        override: {
          apis: (original) => {
            return {
              ...original,
              signUpPOST: async (input) => {
                try {
                  const response = await original.signUpPOST!(input)

                  if (response.status === "OK" && response.user.loginMethods.length === 1 && input.session === undefined) {
                    await User.build(PutItemCommand)
                      .item({
                        userId: response.user.id,
                        email: response.user.loginMethods[0]!.email!,
                        username: '',
                        isActive: true,
                      }).send()
                  }

                  return response
                } catch (error: any) {
                  logger.error(error.message)

                  return {
                    status: 'GENERAL_ERROR',
                    message: error.message
                  }
                }
              }
            }
          }
        }
      }), // initializes signin / sign up features
      Session.init(), // initializes session features
      Dashboard.init(),
      EmailVerification.init({
        mode: "REQUIRED", // or "OPTIONAL"
      }),
    ],
    isInServerlessEnv: true
  })
}

