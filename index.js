const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const route = require('./routes')
const db = require('./db')

const redis = require('redis')
const client = redis.createClient()

client.on('error', (err) => console.log('Error ' + err))

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.get(route.displayTasks, (req, res) => {
  let tasks = {
  'status': 'success',
  'data': {}
  }
  db.getAllTasks(function(err, data){
    if (err) {
      console.log(err)
    } else {
      tasks.data = data
      res.json(tasks)
    }
  })
})

app.listen(3000, () => {
  console.log('running on 3000')
})
