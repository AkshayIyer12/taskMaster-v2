 const express = require('express')
 const cors = require('cors')
 const app = express()
 const bodyParser = require('body-parser')
 const route = require('./routes')
 const db = require('./db')
 const PORT = process.env.PORT || 3000
 
 app.use(express.static('public'))
 app.use(cors())
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({
   extended: false
 }))

 app.get(route.displayTasks, (req, res) => {
   let tasks = {
     'status': 'success',
     'data': {}
   }
   db.getAllTasks(function (err, data) {
     if (err) {
       res.json({'status': 'error', 'message': err.message})
     } else {
       tasks.data = data
       res.json(tasks)
     }
   })
 })

 app.get(route.task, (req, res) => {
   db.getTaskById(req.params.taskId, (err, value) => {
     if (err) {
       res.json({'status': 'error', 'message': err.message})
     } else {
       res.json({
         'status': 'success',
         'data': value})
     }
   })
 })

 app.delete(route.deleteTask, (req, res) => {
   db.deleteTaskById(req.params.taskId, (err, value) => {
     if (err) {
       res.json({'status': 'error', 'message': err.message})
     } else {
       res.json({
         'status': 'success',
         'data': value
       })
     }
   })
 })

 app.post(route.createTask, (req, res) => {
   if (Object.keys(req.body).length !== 0) {
    req.body.type = "task"
     db.addTask(req.body, (err, value) => {
       if (err) {
         res.json({'status': 'error', 'message': err.message})
       } else {
         res.json({
           'status': 'success',
           'data': value
         })
       }
     })
   } else {
     res.json({
       'status': 'error',
       'message': 'Empty body'
     })
   }
 })

 app.put(route.updateTask, (req, res) => {
   if (Object.keys(req.body).length !== 0) {
     db.updateTask(req.params.taskId, req.body, (err, value) => {
       if (err) {
         res.json({'status': 'error', 'message': err.message})
       } else {
         res.json({
           'status': 'success',
           'data': value
         })
       }
     })
   } else {
     res.json({
       'status': 'error',
       'message': 'Empty body'
     })
   }
 })

 app.get(route.displayUsers, (req, res) => {
   let users = {
     'status': 'success',
     'data': {}
   }
   db.getAllUsers(function (err, data) {
     if (err) {
       res.json({'status': 'error', 'message': err.message})
     } else {
       users.data = data
       res.json(users)
     }
   })
 })

 app.get(route.user, (req, res) => {
   db.getUserById(req.params.userId, (err, value) => {
     if (err) {
       res.json({'status': 'error', 'message': err.message})
     } else {
       res.json({
         'status': 'success',
         'data': value})
     }
   })
 })

 app.delete(route.deleteUser, (req, res) => {
   db.deleteUserById(req.params.userId, (err, value) => {
     if (err) {
       res.json({'status': 'error', 'message': err.message})
     } else {
       res.json({
         'status': 'success',
         'data': value
       })
     }
   })
 })

 app.post(route.createUser, (req, res) => {
   if (Object.keys(req.body).length !== 0) {
    req.body.type = "user"
     db.addUser(req.body, (err, value) => {
       if (err) {
         res.json({'status': 'error', 'message': err.message})
       } else {
         res.json({
           'status': 'success',
           'data': value
         })
       }
     })
   } else {
     res.json({
       'status': 'error',
       'message': 'Empty body'
     })
   }
 })

 app.put(route.updateUser, (req, res) => {
   if (Object.keys(req.body).length !== 0) {
     db.updateTask(req.params.userId, req.body, (err, value) => {
       if (err) {
         res.json({'status': 'error', 'message': err.message})
       } else {
         res.json({
           'status': 'success',
           'data': value
         })
       }
     })
   } else {
     res.json({
       'status': 'error',
       'message': 'Empty body'
     })
   }
 })

 app.listen(PORT, () => {
   console.log('running on '+PORT)
 })
