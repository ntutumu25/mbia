const User = require("../models/user")
const passport = require("passport")
const {format} = require('timeago.js')
const Post = require("../models/post")


const registerForm = (req, res) =>{
    res.render("./users/register")
}

const register = async (req, res)=>{
    let errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      errors.push({ text: "Passwords do not match." });
    }
    // verificar si la contrasena tiene menos de 3 caracteres
    if (password.length < 4) {
      errors.push({ text: "la contrasena debe tener un minimo de 4 carcateres" });
    }
    // verificar si la contrasena tiene algun caracter
    if (errors.length > 0) {
       return res.render("./users/register", {
         errors,
         name,
         email,
         password,
         confirm_password,
       });
     }
  
  // verificar si el correo ya existe en la base de datos
  const userFound = await User.findOne({ email: email });
  if (userFound) {
    errors.push({ text: "the email exite yet" });
    return res.render("./users/register", {errors});
  }

  // Guardar usuario
  const newUser = new User({ name, email, password });
  console.log(newUser.password)
  newUser.password = await newUser.encryptPassword(password);
  console.log(newUser.password)
  await newUser.save();
    
  req.flash("success_sms", "You are registered.");
  res.redirect("/");
}
// actulizar el nombre de un usuario
const updateUser = async (req, res)=>{
  const {name} = req.body
  const id = req.params.id
  await User.findByIdAndUpdate(id, {name});
  req.flash("success_sms", "update succesfuly");
  res.redirect('/users/space')

}
// login formulario de usuario 
const loginForm = (req, res)=>{
  res.render("./users/login")
}
// verificacion de la autentificacion del usuario por pasport
const login = passport.authenticate("local", {
  successRedirect: "/users/space",
  failureRedirect: "/auth/login",
  failureFlash: true,
});

// logout del usuario
const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "You are logged out now.");
    res.redirect("/auth/login");
  });
};

// info del espacio usuario 
const user = async(req, res)=>{
  
  usuario = await User.findOne({ _id: req.user.id })
  fechaUser = usuario.date.toLocaleDateString('ES')
  public = await Post.find({autor:req.user.id}).sort({ date: "desc", date: -1 }).lean()
  
  for(i=0; i<public.length; i++){
    public[i].date=format(public[i].date)
  }
  
  res.render('./users/user-space', {usuario, fechaUser, public,})
}


module.exports = {
    registerForm,
    register,
    loginForm, 
    login,
    logout, user, updateUser
}
