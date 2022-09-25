function notLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('error','Login to continue')
    return res.redirect('/login')
}

module.exports = notLoggedIn;