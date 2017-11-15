const redis = require('redis')

const client = redis.createClient()
client.on('error', (err) => console.log('Error ' + err))

const getAllTasks = (cb) => {
  client.keys('*', (err, key) => {
    let pall = []
    if (err) {
      cb(err)
    } else  {
        for (let i = 0; i < key.length; i++) {
          let p = new Promise((resolve,reject) =>{
            client.hgetall(key[i], (err, value) => {
              resolve(value)
            })
          })
        pall.push(p)
        }
    }
    Promise.all(pall).then(function(value){
        cb(null, value)
    })
  })
}

module.exports = {
	getAllTasks
}
