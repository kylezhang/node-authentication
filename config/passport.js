var LocalStrategy     = require('passport-local').Strategy
var User              = require('../app/models/user')

module.exports  = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, (req, email, password, done) => {
        process.nextTick(() => {
          User.findOne({ 'local.email' : email }, (err, user) => {
            if(err)
              return done(err)
            if(user){
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
            } else {
              var newUser = new User()

              newUser.local.email     = email
              newUser.local.password  = newUser.generateHash(password)

              newUser.save((err) => {
                if(err)
                  throw err
                return done(null, newUser)
              })
            }
          })
        })
    })
  )
}