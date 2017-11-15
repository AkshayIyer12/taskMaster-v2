const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const route = require('./routes')
const helper = require('./helper')

const redis = require('redis')
const client = redis.createClient()

client.on('error', (err) => console.log('Error ' + err))

let counter = 0

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

app.get(route.createTask, (req, res) => res.sendFile(path.join(__dirname, '/public/createTask.html')))

app.post(route.createTask, (req, res) => {
  if (helper.sanitize(req.body) !== false) {
    // empty fields
    ++counter
    client.hmset('task' + counter, req.body, redis.print)
    client.hgetall('task' + counter, (err, obj) => {
      if (err) throw new Error('Fetching task failed!')
      console.log(obj)
    })
  } else {
    throw new Error('You have left a field empty')
  }
  res.send('creating task!')
})

// app.get(route.updateTask, (req,res) => res.sendFile(path.join(__dirname, '/public/updateTask.html')))
app.get(route.displayTasks, (req, res) => {
  let str = ''
  client.keys('*', (err, key) => {
    if (err) throw new Error('Empty Data!')
    for (let i = 0; i < key.length; i++) {
      client.hgetall(key[i], (err, value) => {
        if (err) throw new Error(`Key doesn't exist!`)
        str += '<li>' + value.assignTo + ' ' + value.desc + ' ' +
      value.taskName + ' ' + value.dueDate + '</li>\n'
        console.log(str)
      })
    }
  })
  res.send(`
  <html>
  <body>
    <ul>
      ${str}
    </ul>
  </body>
  </html>`)
})
//   for (let i in Object.keys()) {
//     str += '<li>' + db.data[i].taskName + ' ' + db.data[i].assignTo + '</li>\n';
//   }

// app.post(route.updateTask, (req, res) => {

// })

app.post(route.displayTasks, (req, res) => {
  if (!helper.sanitize(req.body)) {
    // empty fields
  } else {
    // db.data[++counter] = req.body
  }
  res.send('creating task!')
})

app.listen(3000, () => {
  console.log('running on 3000')
})

app.get(route.deleteTask, (req, res) => {
  // client.del(req.body, (err, obj) => console.log(obj))
})
