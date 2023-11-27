const passport = require("passport");

// login_get, login_post, logout_get
exports.login_get = (req, res) => {
    // If user is already logged in, redirect them to the homepage
    if (res.locals.currentUser) return res.redirect("/");
    res.render('login');
}

exports.login_post = passport.authenticate("local", {
    successRedirect: "/catalog",
    failureRedirect: "/api/login"
});
