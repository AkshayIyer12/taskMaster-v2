const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const route = require('./routes')
const helper = require('./helper')
const db = require('./data')

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
  if (!helper.sanitize(req.body)) {
    // empty fields
  } else {
    db.data[++counter] = req.body
  }
  res.send('creating task!')
})

// app.get(route.updateTask, (req,res) => res.sendFile(path.join(__dirname, '/public/updateTask.html')))
app.get(route.displayTasks, (req, res) => {
  let str = '';
  for (let i in Object.keys(db.data)) {
    str += '<li>' + db.data[i].taskName + ' ' + db.data[i].assignTo + '</li>\n';
  }

  res.send(`
  <html>
  <body>
    <ul>
      ${str}
    </ul>
  </body>
  </html>`)
})

// app.post(route.updateTask, (req, res) => {

// })

app.post(route.displayTasks, (req, res) => {
  if (!helper.sanitize(req.body)) {
    // empty fields
  } else {
    db.data[++counter] = req.body
  }
  res.send('creating task!')
})

app.listen(3000, () => {
  console.log('running on 3000')
})
