const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const  User = require("../models/user.js");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },async (email, password, done) => {
      // relacion el correo con el usuario
      const user = await User.findOne({ email: email });
      //console.log(user)

      if (!user) {
        return done(null, false, { message: "error de usuario o de contrasena" });
      }

      // relacion la contrase con la del usuario
      const isMatch = await user.matchPassword(password);
      if (!isMatch)
        return done(null, false, { message: "error de usuario o de contrasena" });
      
      return done(null, user);
    }
  )
);

// crear una session del usario

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
