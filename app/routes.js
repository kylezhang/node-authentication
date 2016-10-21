module.exports = (app, passport) => {
  app.get('/', (rq, res)=>{
    res.render('index.ejs')
  })

  app.get('/login', (req, res) => {
    res.render('login.ejs', { message : req.flash('loginMessage') })
  })

  app.get('/signup', (req, res) => {
    res.render('signup.ejs', { message : req.flash('signupMessage') })
  })

  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.ejs', { user : req.user })
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/profile',
      failureRedirect : '/signup',
      failuseFlash    : true
    })
  )
}

var isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
    return next()
  res.redirect('/')
}