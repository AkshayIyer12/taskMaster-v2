const routes = {
  displayTasks: '/tasks',
  task: '/task/:taskId',
  createTask: '/task',
  displayUsers: '/users',
  user: '/user',
  getUserById: '/user/:userId',
  displayUserTasks: '/userTasks',
  authGoogle: '/auth/google',
  callbackRoute: '/auth/google/callback',
  login: '/login'
}

module.exports = routes
