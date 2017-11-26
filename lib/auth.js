const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const config = require('./config.js')
module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, {})
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })
  passport.use(new GoogleStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
  }, (token, refreshToken, profile, done) => {
    return done(null, {
      profile: profile,
      token: token
    })
  }))
}
