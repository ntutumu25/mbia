const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User');
//const User = require("../models/user")
const path = require('path')

const postSchema = new Schema({
    image: {type: String, default: '/img/uploades/default-post.png', trim:true},
    title: { type: String, trim: true },
    description: {type: String, trim:true},
    date:{type: Date, default: Date.now},
    autor: { type: Schema.ObjectId, ref: "User" },
    likes: [],
    numberLike: {type: Number, default:0},
    userLike: {type: Boolean, default:false},
    comment: [{
        autor:{type: String},
        comment:{type:String},
        date:{type: Date, default: Date.now}
    }],
    numberComment:{type: Number, default:0}

});

module.exports = mongoose.model("Post", postSchema); 