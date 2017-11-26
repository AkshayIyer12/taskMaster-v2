 const express = require('express')
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
 app.use(session({ secret: '5a150a5add703325bcffc6c9' }))
 app.use(passport.initialize())
 app.use(passport.session())
 auth(passport)
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({
   extended: false
 }))

 app.all(['/userTasks', '/task/:taskId', '/task', '/user/:userId', '/'], (req, res, next) => {
   if (req.isAuthenticated()) {
     next()
   } else {
     res.redirect(route.login)
   }
 })

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

 app.get(route.getTaskById, (req, res) => {
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

 app.delete(route.getTaskById, (req, res) => {
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
     req.body.assignByName = req.user.userName
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

 app.put(route.getTaskById, (req, res) => {
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

 app.get(route.getUserById, (req, res) => {
   if (req.param.userId) {
     db.getUserById(req.param.userId, (err, value) => {
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
     res.redirect(route.login)
   }
 })

 app.delete(route.user, (req, res) => {
   if (checkReqUser(req.user)) {
     db.deleteUserById(req.user.UserId, (err, value) => {
       if (err) {
         res.json({'status': 'error', 'message': err.message})
       } else {
         res.json({
           'status': 'success',
           'data': value
         })
         res.redirect(route.logout)
       }
     })
   } else {
     res.redirect(route.login)
   }
 })

 app.post(route.user, (req, res) => {
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

 app.put(route.user, (req, res) => {
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
     res.redirect(route.login)
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
         res.json({
           'status': 'success',
           'data': value
         })
       }
     })
   } else {
     res.redirect(route.login)
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
       res.redirect(route.login)
     } else {
       req.session.passport.user.UserId = value
       req.session.passport.user.userName = user.userName
       res.redirect('/')
     }
   })
 })

 app.get(route.login, (req, res) => {
   res.sendFile(path.join(__dirname, '..', 'build', 'login.html'))
 })

 app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
 })

 app.get(route.logout, function (req, res) {
   console.log('logging out')
   req.logout()
   res.redirect(route.login)
 })

 app.listen(PORT, () => {
   console.log('running on ' + PORT)
 })
