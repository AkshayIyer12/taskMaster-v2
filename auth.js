const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })
  passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL
  }, (token, refreshToken, profile, done) => {
    return done(null, {
      profile: profile,
      token: token
    })
  }))
}
