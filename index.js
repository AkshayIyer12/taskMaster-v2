const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: false
}))

app.post('/', (req, res) => {
  res.send('POST request to the homepage')
  console.log(req.body)
})

app.get('/createTask', (req, res) => res.sendFile(path.join(__dirname, '/public/task.html')))

app.post('/createTask', (req, res) => {
  // console.log(req.body, '\n-------------------------------')
  // console.log(Object.keys(req.body))
  let taskInfo = JSON.parse(req.body)
  console.log(Object.keys(taskInfo))
  console.log(taskInfo.task_name)
  // console.log(req.body)
  res.send('creating task!')
})

app.listen(3000, () => {
  console.log('running on 3000')
})
