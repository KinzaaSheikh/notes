import { default as express } from 'express'

export const router = express.Router()

router.get('/', async (req, res, next) => {
  // will populate with code later

  res.render('index', { title: 'Notes' })
})
