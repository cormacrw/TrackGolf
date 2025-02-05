import Session from "supertokens-web-js/recipe/session";
import { EmailVerificationClaim } from "supertokens-web-js/recipe/emailverification";
import { goto } from '$app/navigation'

export const authGuard = async () => {
  if (await Session.doesSessionExist()) {
    const validationErrors = await Session.validateClaims()
    console.log(validationErrors)

    if (validationErrors.length === 0) {
      if (window.location.pathname === '/auth/sign-in') {
        goto('/s/dashboard')
      }
      // user has verified their email address
      return true
    } else {
      for (const err of validationErrors) {
          if (err.id === EmailVerificationClaim.id) {
              // email is not verified
              goto('/auth/verify')
          }
      }
    }
  } else {
    if (window.location.pathname !== '/auth/sign-in') {
      goto('/auth/sign-in')
    }
  }
}
