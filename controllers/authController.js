const passport = require("passport");

// login_get, login_post, logout_get
exports.login_get = (req, res) => {
    // If user is already logged in, redirect them to the catalog
    if (res.locals.currentUser) return res.redirect("/catalog");
    res.render('login');
}

exports.login_post = passport.authenticate("local", {
    successRedirect: "/catalog",
    failureRedirect: "/api/login"
});

exports.logout_post = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
};


