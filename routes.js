const routes = {
  displayTasks: '/tasks',
  task: '/task/:taskId',
  deleteTask: '/task/:taskId',
  createTask: '/task',
  updateTask: '/task/:taskId',
  displayUsers: '/users',
  user: '/user',
  deleteUser: '/user',
  createUser: '/user',
  updateUser: '/user',
  displayUserTasks: '/userTasks',
  authGoogle: '/auth/google',
  callbackRoute: '/auth/google/callback',
  login: '/login'
}

module.exports = routes
