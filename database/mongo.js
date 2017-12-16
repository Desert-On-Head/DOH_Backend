var mongoose = require('mongoose')
var schema = mongoose.Schema
var DB_NAME = "14th_APPJAM"
var db = mongoose.connect("mongodb://localhost/"+DB_NAME, {useMongoClient : true} ,(err)=>{
    if(err){
        console.log('DB Error')
        throw err
    }
    else {
        console.log('DB Connect Success => '+DB_NAME)
    }
})

var User_Schema = new schema({
    username : {type : String},
    id : {type : String},
    password : {type : String},
    email : {type : String}
})

var User = mongoose.model('user', User_Schema)

exports.db = db
exports.User = User