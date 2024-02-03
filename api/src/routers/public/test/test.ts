import { Router } from 'express'

const register = (router: Router) => {
  router.get('/test', (req, res) => {
    res.send('Public response!')
  })
}

export default { register }