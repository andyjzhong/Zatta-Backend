const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connection = require('./db/connection.js')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express()

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))


const usersController = require('./controllers/users.js')
const notesController = require('./controllers/notes.js')
const todosController = require('./controllers/todos.js')

app.get('/api/users/session/:id', (req, res, next) => {
  sessionStore.get(req.params.id, (err, session) => {
      session
      ? res.send(session)
      : res.send("No session")
  })
})

app.delete('/api/users/session/:id', (req, res, next) => {
  sessionStore.destroy(req.params.id, (err, session) => {
    err
    ? res.send(false)
    : res.send(true)
  })
})

app.use('/api/users', usersController)
app.use('/api/notes', notesController)
app.use('/api/todos', todosController)




const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("Connected Port 4000")
})

