import { Router } from 'express'

const register = (router: Router) => {
  router.get('/test', (req, res) => {
    res.send('Private response!')
  })
}

export default { register }