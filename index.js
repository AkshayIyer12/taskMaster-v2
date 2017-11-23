 const express = require('express')
 const cors = require('cors')
 const app = express()
 const path = require('path')
 const passport = require('passport')
 const auth = require('./auth')
 const bodyParser = require('body-parser')
 const route = require('./routes')
 const db = require('./db')
 const PORT = process.env.PORT || 3000
 const session = require('express-session')

 app.use(express.static('build'))
 app.use(cors())
 app.use(session({ secret: '5a150a5add703325bcffc6c9' }))
 app.use(passport.initialize())
 app.use(passport.session())
 auth(passport)
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
     req.body.type = 'task'
     req.body.assignBy = req.user.UserId
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
   if (checkReqUser(req.user)) {
     db.getUserById(req.user.UserId, (err, value) => {
       if (err) {
         res.json({ 'status': 'error', 'message': err.message })
       } else {
         res.json({
           'status': 'success',
           'data': value
         })
       }
     })
   } else {
     res.redirect('/login')
   }
 })

 app.delete(route.deleteUser, (req, res) => {
   if (checkReqUser(req.user)) {
     db.deleteUserById(req.user.UserId, (err, value) => {
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
     res.redirect('/login')
   }
 })

 app.post(route.createUser, (req, res) => {
   if (Object.keys(req.body).length !== 0) {
     req.body.type = 'user'
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
   if (checkReqUser(req.user)) {
     if (Object.keys(req.body).length !== 0) {
       db.updateTask(req.user.UserId, req.body, (err, value) => {
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
   } else {
     res.redirect('/login')
   }
 })

 const checkReqUser = (user) => {
   if (user) {
     return true
   } else {
     return false
   }
 }

 app.get(route.displayUserTasks, (req, res) => {
   if (checkReqUser(req.user)) {
     db.getTasksByUserId(req.user.UserId, (err, value) => {
       if (err) {
         res.json({'status': 'error', 'message': err.message})
       } else {
         console.log('Index ',value)
         res.json({
           'status': 'success',
           'data': value
         })
       }
     })
   } else {
     res.redirect('/login')
   }
 })

 app.get(route.authGoogle, passport.authenticate('google', {
   scope: `https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`
 }))

 app.get(route.callbackRoute, passport.authenticate('google', {
   failureRedirect: '/failure.html'
 }), (req, res) => {
   let user = {
     userName: req.user.profile.displayName,
     emailId: req.user.profile.emails[0].value,
     type: 'user'
   }
   db.checkAndAddUser(user, (err, value) => {
     if (err) {
       res.redirect('/login')
     } else {
       req.session.passport.user.UserId = value
       res.redirect('/')
     }
   })
 })

 app.get(route.login, (req, res) => {
   res.sendFile(path.join(__dirname, 'build', 'login.html'))
 })

 app.get('/', function (req, res) {
   if (req.isAuthenticated()) {
     res.sendFile(path.join(__dirname, 'build', 'index.html'))
   } else {
     res.sendFile(path.join(__dirname, 'build', 'login.html'))
   }
 })

 app.get('/logout', function (req, res) {
   console.log('logging out')
   req.logout()
   res.redirect('/')
 })

 app.listen(PORT, () => {
   console.log('running on ' + PORT)
 })
