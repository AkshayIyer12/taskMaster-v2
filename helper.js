const bcrypt = require('bcrypt')
const saltRounds = 10

const hashPassword = (password) => {
  return bcrypt.hash(password, saltRounds)
  // .then(hash => {
  //   return hash
  // })
}
const compareHash = (password, hash) => {
  return bcrypt.compare(password, hash)
  // .then(res => {
  //   return res
  // })
}

module.exports = {
  hashPassword,
  compareHash
}
