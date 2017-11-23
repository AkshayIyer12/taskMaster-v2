const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, {})
  })
  passport.deserializeUser((user, done) => {
    console.log('Deserialize ' + user)
    done(null, user)
  })
  passport.use(new GoogleStrategy({
    clientID: '628987246742-tmfpj8epv74g6orsnkf20ahpcspvdvs2.apps.googleusercontent.com',
    clientSecret: 'cdr3DQL1Hbug0UmY226YLwfU',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  }, (token, refreshToken, profile, done) => {
    return done(null, {
      profile: profile,
      token: token
    })
  }))
}
