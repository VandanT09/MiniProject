import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import Connection from './database/db.js'
import route from './routes/route.js'
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()
const PORT = 8000

Connection()
app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', route)

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})