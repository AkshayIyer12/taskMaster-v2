const mongo = require('mongodb')
const client = mongo.MongoClient
const ObjectId = mongo.ObjectId
let db = {}

client.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskMaster-v2', (err, database) => {
  if (err) {
    throw new Error('Connection could not be established with MONGO_DB')
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
        if (value[0].hasOwnProperty('type')) {
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
        if (value[0].hasOwnProperty('type')) {
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

const checkUser = (emailId, cb) => {
  db.collection('collector').find({emailId: emailId})
  .toArray((err, value) => {
    if (err) {
      cb(err || new Error('Wrong Parameters'))
    } else if (value.length === 1) {
      cb(null, value)
    } else {
      cb(null, false)
    }
  })
}

const checkAndAddUser = (user, cb) => {
  checkUser(user.emailId, (err, value) => {
    if (err) {
      cb(err)
    } else if (value.length === 1) {
      let id = value[0]._id.toHexString()
      cb(null, id)
    } else {
      db.collection('collector').insertOne(user, (err, val) => {
        if (err !== null || val.result['n'] === 0) {
          cb(err || new Error('Adding user failed'))
        } else {
          let id = val.insertedId.toHexString()
          cb(null, id)
        }
      })
    }
  })
}

const addUser = (user, cb) => {
  db.collection('collector').insertOne(user, (err, val) => {
    if (err !== null || val.result['n'] === 0) {
      cb(err || new Error('Adding user failed'))
    } else {
      let id = val.insertedId.toHexString()
      cb(null, id)
    }
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
          if (task === undefined) {
            return accum
          }
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
  checkAndAddUser
}
