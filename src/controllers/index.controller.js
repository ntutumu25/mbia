const User = require("../models/user")
const Post = require("../models/post")
const { format } = require('timeago.js')


const home = async (req, res) => {

    //const posts = await Post.find().sort({ date: "desc" }).lean();
    if(req.user){
      Post.find({}, function (err, libros) {
          User.populate(libros, { path: "autor" }, function (err, libros) {
              //res.status(200).send(libros);
             for (i = 0; i < libros.length; i++) {
                 libros[i].date = format(libros[i].date)
                 libros[i].userLike = libros[i].likes.includes(req.user.name)
                 libros[i].numberLike = libros[i].likes.length
                 libros[i].numberComment = libros[i].comment.length
                 for(j=0; j< libros[i].comment.length; j++){

                    libros[i].comment[j].date = format(libros[i].comment[j].date)
                 } 
             }


 

             res.render('index', { "mensaje": "welcome in our webside", libros})
            
          });
      }).sort({ date: "desc" }).lean();
    }else{
        res.render('index')
    }
    
   

   
}


module.exports = {
    home
}