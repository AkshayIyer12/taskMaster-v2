const mongo = require('mongodb')
const helper = require('./helper')
const client = mongo.MongoClient
const ObjectId = mongo.ObjectId
let db = {}

client.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskMaster-v2', (err, database) => {
  if (err) {
    throw new Error('Connection could not be established')
  } else {
    console.log('Server has started successfully')
    db = database
  }
})

const getAllTasks = (cb) => {
  db.collection('collector').find({type: 'task'}).toArray((err, value) => {
    if (err) {
      cb(err)
    } else {
      cb(null, value)
    }
  })
}

const getTaskById = (taskId, cb) => {
  if (ObjectId.isValid(taskId)) {
    let objID = new ObjectId(taskId)
    db.collection('collector').find({_id: objID}).toArray((err, value) => {
      if (err || value === null) {
        cb(err || new Error('Cannot find the id'))
      } else {
        if ('type' in value[0]) {
          delete value[0].type
        }
        cb(null, value[0])
      }
    })
  } else {
    cb(new Error('TaskId is not valid'))
  }
}

const deleteTaskById = (taskId, cb) => {
  if (ObjectId.isValid(taskId)) {
    let objID = new ObjectId(taskId)
    db.collection('collector').deleteOne({_id: objID}, (err, value) => {
      if (err !== null || value.result['n'] === 0) {
        cb(err || new Error('Cannot find the id'))
      } else {
        cb(null)
      }
    })
  } else {
    cb(new Error('TaskId is not valid'))
  }
}

const addTask = (task, cb) => {
  db.collection('collector').insertOne(task, (err, val) => {
    if (err) {
      cb(err || new Error('Adding task failed'))
    } else {
      cb(null, val.insertedId)
    }
  })
}

const updateTask = (taskId, task, cb) => {
  if (ObjectId.isValid(taskId)) {
    let objID = new ObjectId(taskId)
    db.collection('collector').update({_id: objID}, {$set: task}, (err, res) => {
      if (err !== null || res.result['nModified'] === 0) {
        cb(err || new Error('Cannot update the task'))
      } else {
        cb(null, res.result['nModified'])
      }
    })
  } else {
    cb(new Error('TaskId is not valid'))
  }
}

const getAllUsers = (cb) => {
  db.collection('collector').find({type: 'user'}).toArray((err, value) => {
    if (err) {
      cb(err)
    } else {
      cb(null, value)
    }
  })
}

const getUserById = (userId, cb) => {
  if (ObjectId.isValid(userId)) {
    let userID = new ObjectId(userId)
    db.collection('collector').find({_id: userID}).toArray((err, value) => {
      if (err !== null || value.length === 0) {
        cb(err || new Error('Cannot find the user id'))
      } else {
        if ('password' in value[0] || 'type' in value[0]) {
          delete value[0].password
          delete value[0].type
        }
        cb(null, value[0])
      }
    })
  } else {
    cb(new Error('User Id is not valid'))
  }
}

const deleteUserById = (userId, cb) => {
  if (ObjectId.isValid(userId)) {
    let userID = new ObjectId(userId)
    db.collection('collector').deleteOne({_id: userID}, (err, value) => {
      console.log(err, value)
      if (err !== null || value.result['n'] === 0) {
        cb(err || new Error('Cannot find the user id'))
      } else {
        cb(null)
      }
    })
  } else {
    cb(new Error('UserId is not valid'))
  }
}

const addUser = (user, cb) => {
  helper.hashPassword(user.password)
  .then(hash => {
    user.password = hash
    db.collection('collector').insertOne(user, (err, val) => {
      if (err !== null || val.result['n'] === 0) {
        cb(err || new Error('Adding user failed'))
      } else {
        cb(null, val.insertedId)
      }
    })
  }).catch(err => {
    cb(new Error(err))
  })
}

const updateUser = (userId, user, cb) => {
  if (ObjectId.isValid(userId)) {
    let userID = new ObjectId(userId)
    db.collection('collector').update({_id: userID}, {$set: user}, (err, res) => {
      if (err !== null || res.result['nModified'] === 0) {
        cb(err || new Error('Cannot update the user details'))
      } else {
        cb(null, res.result['nModified'])
      }
    })
  } else {
    cb(new Error('UserId is not valid'))
  }
}

const getTasksByUserId = (userId, cb) => {
  if (ObjectId.isValid(userId)) {
    db.collection('collector').find({
      $or: [ { assignTo: userId }, { assignBy: userId } ]
    }).toArray((err, value) => {
      if (err === null && value.length === 0) {
        cb(err || new Error('Cannot find the task associated with id'))
      } else {
        let assignCategory = value.reduce((accum, task) => {
          if (task.assignTo === userId) {
            accum.assignTo.push(task)
          } else {
            accum.assignBy.push(task)
          }
          return accum
        }, {
          assignTo: [],
          assignBy: []
        })
        cb(null, assignCategory)
      }
    })
  } else {
    cb(new Error('UserId is not valid'))
  }
}

const autheticateUser = (data, cb) => {
  let userId = data.userId
  let password = data.password
  if (ObjectId.isValid(userId)) {
    let userID = new ObjectId(userId)
    db.collection('collector').find({_id: userID}).toArray((err, value) => {
      if (err !== null || value.length === 0) {
        cb(err || new Error('Cannot find the user id'))
      } else {
        helper.compareHash(password, value[0].password)
        .then(res => {
          if (res) {
            cb(null, res)
          } else {
            cb(new Error('Wrong Password'))
          }
        })
        .catch(failure => {
          cb(new Error(failure))
        })
      }
    })
  } else {
    cb(new Error('UserId is not valid'))
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  deleteTaskById,
  addTask,
  updateTask,
  getAllUsers,
  getUserById,
  deleteUserById,
  addUser,
  updateUser,
  getTasksByUserId,
  autheticateUser
}
