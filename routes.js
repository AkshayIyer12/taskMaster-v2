const routes = {
  displayTasks: '/tasks',
  task: '/task/:taskId',
  deleteTask: '/task/:taskId',
  createTask: '/task',
  updateTask: '/task/:taskId',
  displayUsers: '/users',
  user: '/user/:userId',
  deleteUser: '/user/:userId',
  createUser: '/user',
  updateUser: '/user/:userId',
  displayUserTasks: '/tasks/:userId',
  authGoogle: '/auth/google',
  callbackRoute: '/auth/google/callback'
}

module.exports = routes
