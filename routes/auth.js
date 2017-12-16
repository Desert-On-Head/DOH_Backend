module.exports = auth

function auth(app, db, RandomString, nodemailer, smtpPool) {

    var config = (
        {
            "mailer": {
                "service": "Gmail",
                "host": "smtp.gmail.com",
                "port": "465",
                "secure": true,
                "user": "cho041860",
                "password": "qq**041860"
            }
        })

    var transporter = nodemailer.createTransport(smtpPool({
        service: config.mailer.service,
        host: config.mailer.host,
        port: config.mailer.port,
        secure:config.mailer.secure,
        auth: {
            user: config.mailer.user,
            pass: config.mailer.password
        },
        tls: {
            rejectUnauthorize: false
        },
        maxConnections: 5,
        maxMessages: 10
    }));

    app.post('/auth/register', (req, res)=>{
        var body = req.body
        db.User.findOne({
            id : body.id
        }, (err, data)=>{
            if(err){
                console.log('/auth/register userfind Error')
                res.status(500).send('/auth/register userfind Error')
                throw err
            }
            else if(data){
                res.status(401).send('Already In Database')
            }
            else {
                var save_user = new db.User({
                    username : body.username,
                    id : body.id,
                    password : body.password,
                    email : body.email
                })
                save_user.save((err)=>{
                    if(err){
                        console.log('/auth/register usersave Error')
                        res.status(500).send('/auth/register usersave Error')
                        throw err
                    }
                    else {
                        res.status(200).send('Register success')
                    }
                })
            }
        })
    })

    app.post('/auth/login', (req, res)=>{
        var body = req.body
        db.User.findOne({
            id : body.id
        }, (err, data)=>{
            if(err){
                console.log('/auth/login userfind Error')
                res.status(500).send('/auth/login userfind Error')
                throw err
            }
            else if(data){
                if(body.password == data.password){
                    res.status(200).send(data)
                }
                else {
                    res.status(403).send('Password Error')
                }
            }
            else{
                res.status(403).send('User Not Founded')
            }
        })
    })

    app.post('/auth/findpassword', (req, res)=>{
        var body = req.body
        var new_password = RandomString.generate(10)
        db.User.findOne({
            email : body.email,
            username : body.username
        }, (err, data)=>{
            if(err){
                console.log('/auth/findpassword userfind Error')
                res.status(500).send('/auth/findpassword userfind Error')
                throw err
            }
            else if(data){
                db.User.update({
                    email : body.email
                },{$set:{password : new_password}}, (err)=>{
                    if(err){
                        console.log('/auth/findpassword userupdate Error')
                        res.status(500).send('/auth/findpassword userupdate Error')
                        throw err
                    }
                    else {
                        var mailOptions = {
                            from: 'cho041860',
                            to: body.email,
                            subject: '발급된 임시 비밀번호 입니다',
                            text: '임시비밀번호는 '+new_password+" 입니다"
                        };
                        transporter.sendMail(mailOptions, (err, response)=>{
                            if (err) {
                                console.log('메일 발송 실패 => ' + err);
                                res.send(500, "Fail")
                            } else {
                                console.log('임시비밀번호 메일 발송 완료');
                                res.send(200,'Mail Send Success '+response)
                            }
                        });
                    }
                })
            }
        })
    })

}