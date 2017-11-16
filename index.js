 const express = require('express')
 const cors = require('cors')
 const app = express()
 const bodyParser = require('body-parser')
 const route = require('./routes')
 const db = require('./db')
 app.use(cors())
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
   db.getAllTasks(function (err, data) {
     if (err) {
       console.log(err)
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

 app.delete(route.task, (req, res) => {
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

 app.listen(3000, () => {
   console.log('running on 3000')
 })
