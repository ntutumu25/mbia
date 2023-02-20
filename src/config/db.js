const mongoose = require('mongoose')

const runDB = async ()=>{
    await mongoose.connect('mongodb://localhost:27017/loginuser')
    .then(db=>console.log('DB connectado'))
    .catch(err=>console.error(err))
}

runDB()
        



