const redis = require('redis')
const uuid = require('uuid-v4')

const client = redis.createClient()
client.on('error', (err) => console.log('Error ' + err))

const getAllTasks = (cb) => {
  client.keys('*', (err, key) => {
    let pall = []
    if (err) {
      cb(err)
    } else {
      for (let i = 0; i < key.length; i++) {
        let p = new Promise((resolve, reject) => {
          client.get(key[i], (err, value) => {
            resolve(JSON.parse(value))
          })
        })
        pall.push(p)
      }
    }
    Promise.all(pall).then(function (value) {
      cb(null, value)
    })
  })
}

const getTaskById = (taskId, cb) => {
  client.get(taskId, (err, value) => {
    if (err || value === null) {
      cb(err || new Error('Cannot find the id'))
    } else {
      cb(null, JSON.parse(value))
    }
  })
}

const deleteTaskById = (taskId, cb) => {
  client.del(taskId, (err, value) => {
    if (value === 0 || value === undefined) {
      cb(err || new Error('Cannot find the id'))
    } else {
      cb(null)
    }
  })
}

const addTaskToDB = (task, cb) => {
  let uniqueId = uuid()
  client.exists(uniqueId, (err, value) => {
    if (err === null && value === 1) {
      cb(err || new Error('Id already present'))
    } else {
      task['taskId'] = uniqueId
      client.set(uniqueId, JSON.stringify(task))
      cb(null, value)
    }
  })
}

const updateTaskInDB = (taskId, task, cb) => {
  client.exists(taskId, (err, value) => {
    if (err === null && value === 0) {
      cb(err || new Error(`Id doesn't exists`))
    } else {
      task['taskId'] = taskId
      client.set(taskId, JSON.stringify(task))
      cb(null, value)
    }
  })
}

module.exports = {
  getAllTasks,
  getTaskById,
  deleteTaskById,
  addTaskToDB,
  updateTaskInDB
}
