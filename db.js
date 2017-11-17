const mongo = require('mongodb')
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
        cb(null, JSON.parse(JSON.stringify(value[0])))
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
    db.collection('collector').update({_id: objID}, task, (err, res) => {
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
        cb(null, JSON.parse(JSON.stringify(value[0])))
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
  db.collection('collector').insertOne(user, (err, val) => {
    if (err !== null || val.result['n'] === 0) {
      cb(err || new Error('Adding user failed'))
    } else {
      cb(null, val.insertedId)
    }
  })
}

const updateUser = (userId, user, cb) => {
  if (ObjectId.isValid(userId)) {
    let userID = new ObjectId(userId)
    db.collection('collector').update({_id: userID}, user, (err, res) => {
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
        cb(null, JSON.parse(JSON.stringify(value)))
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
  getTasksByUser
}
