const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const route = require('./routes')
const helper = require('./helper')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.get(route.home, (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))
app.post(route.home, (req, res) => {
  res.send('POST request to the homepage')
  console.log(req.body)
})


app.get(route.createTask, (req, res) => res.sendFile(path.join(__dirname, '/public/task.html')))
app.post(route.createTask, (req, res) => {
  console.log(helper.sanitize(req.body))
  res.send('creating task!')
})

app.listen(3000, () => {
  console.log('running on 3000')
})
