import SuperTokens from 'supertokens-web-js'
import Session from 'supertokens-web-js/recipe/session'
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'
import EmailVerification from 'supertokens-web-js/recipe/emailverification'
console.log('Initializing SuperTokens...')

SuperTokens.init({
  appInfo: {
    apiDomain: "http://localhost:4000",
    apiBasePath: "/auth",
    appName: "TrackGolf",
  },
  recipeList: [
    Session.init(),
    EmailPassword.init(),
    EmailVerification.init()
  ],
  // enableDebugLogs: true
})
