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

app.get('/task', (req, res) => res.sendFile(path.join(__dirname, '/public/task.html')))
app.post('/task', (req, res) => {
  res.send('POST Successful')
  console.log(req.body)
})

app.listen(3000)
