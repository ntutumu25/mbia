const User = require("../models/user")

const ListUser = async (req, res)=>{
    errors = []
    const usuarios = await User.find().sort({ date: "desc", date: -1 })
    .lean();
    //console.log(usuarios)
    time = []
    if(usuarios.length>0){
        usuarios.map((usuario)=>{
            
            usuario.date = usuario.date.toLocaleDateString('ES')
          
             
        
        })
        
        res.render("./admin/listeUser", {usuarios,})

    }else{
        errors.push('lista vacia')
        res.render("./admin/listeUser")
    }
}

const userApi = async (req, res)=>{
    const usuarios = await User.find().sort({ date: "desc", date: -1 }).lean();

    res.status(200).json({"respuesta":usuarios})
}


module.exports = {
    ListUser,
    userApi
}