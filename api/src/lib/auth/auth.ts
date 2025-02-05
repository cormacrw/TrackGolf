import supertokens from "supertokens-node"
import Session from "supertokens-node/recipe/session"
import EmailPassword from "supertokens-node/recipe/emailpassword"
import Dashboard from "supertokens-node/recipe/dashboard"
import EmailVerification from "supertokens-node/recipe/emailverification"
import Table from '@/data/Table'

export const init = () => {
  console.log('Initializing Supertokens...')
  supertokens.init({
    framework: "express",
    supertokens: {
      // We use try.supertokens for demo purposes.
      // At the end of the tutorial we will show you how to create
      // your own SuperTokens core instance and then update your config.
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI || '',
      apiKey: process.env.SUPERTOKENS_API_KEY
    },
    appInfo: {
      // learn more about this on https://supertokens.com/docs/session/appinfo
      appName: "TrackGolf",
      apiDomain: "http://localhost:4000",
      websiteDomain: "http://localhost:5173",
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
                const response = await original.signUpPOST!(input)

                if (response.status === "OK" && response.user.loginMethods.length === 1 && input.session === undefined) {
                  console.log(response.user)
                  await Table.create({
                    tgPk: `user#${response.user.id}`,
                    tgSk: `user#${response.user.id}`,
                    userId: response.user.id,
                    username: response.user.emails[0],
                    email: response.user.emails[0]
                  })
                }

                return response
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

