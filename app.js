import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import router from './routers/catsRouter.js'
const app=express()
const formatsLogger=app.get('env')==='development'?'dev':'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/cats',router)

app.use((req, res) => {
    res.status(404).json({ status: 'error', code: 404, message: 'Not found' })
  })
  // uncontrol error
  app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({
      status: status === 500 ? 'fail' : 'error',
      code: status,
      message: err.message,
    })
  })

  export default app