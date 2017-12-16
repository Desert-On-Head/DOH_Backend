var express = require('express')
var bodyParser = require('body-parser')
var RandomString = require('randomstring')
var nodemailer = require('nodemailer')
var smtpPool = require('nodemailer-smtp-pool')
var db = require('./database/mongo')
var app = express()
var PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({
    extended : false
}))

app.listen(PORT, ()=>{
    console.log('Server Running At '+PORT+' Port!')
})

require('./routes/auth')(app, db, RandomString, nodemailer, smtpPool)