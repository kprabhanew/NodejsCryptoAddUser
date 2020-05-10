var express = require("express");
var app = express();
var port = 3000;
var crypto = require('crypto');

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true); //This line to be added incase ,if we get deprecation Warning
mongoose.connect("mongodb://localhost:27017/register-demo", { useNewUrlParser: true }); //if we get deprecation Warning , { useNewUrlParser: true }"  otherwise no need to add
require('./models/User');
var User = mongoose.model('User');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Define the static path
var path = require('path');
app.use(express.static(path.join(__dirname)));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/addUser", (req, res) => {
    res.sendFile(__dirname + "/addUser.html");
});

app.get("/updateUser/:id", (req, res) => {
    //res.sendFile(__dirname + "/updateUser.html");
    User.find({'_id' : req.params.id}).exec((err, r_User) => {
        if (err) {
            res.status(400).send({ message: "Can not get users from database", status: "error" });
        } else {
            console.log(r_User);
            var result = new Array();
            if (r_User) {
                r_User.forEach(function (element) {
                    result.push({
                        name: element.name,
                        email: element.email,
                        password: element.password,
                        dob: element.dob,
                        country: element.country,
                        gender: element.gender,
                        preference: element.preference,
                        _id: element._id
                    })
                })
            }
            console.log(result);
            // var parseResult = JSON.stringify(result);
            // console.log(parseResult);
            res.json({ message: result, status: "success" })
        }
    })
});

//1)  Load Users
app.get("/loaduser", (req, res) => {
    User.find({}).exec((err, r_User) => {
        if (err) {
            res.status(400).send({ message: "Can not get users from database", status: "error" });
        } else {
            console.log(r_User);
            var result = new Array();
            if (r_User) {
                r_User.forEach(function (element) {
                    result.push({
                        name: element.name,
                        email: element.email,
                        password: decryptValue(element.password) ,
                        dob: element.dob,
                        country: element.country,
                        gender: element.gender,
                        preference: element.preference,
                        _id: element._id
                    })
                })
            }
            console.log(result);
            // var parseResult = JSON.stringify(result);
            // console.log(parseResult);
            res.json({ message: result, status: "success" })
        }
    })
})
//2) Register User
app.post("/register", (req, res) => {
    var cipher = crypto.createCipher('aes-256-ctr', 'oursecret123','1z3FtB6OitmFOIsP');
    var encrypted = cipher.update('yourPassword123', 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log ('Encrypted : ' + encrypted);

    var submitData = new User();
    submitData.name = req.body.name;
    submitData.email = req.body.email;
    submitData.password = req.body.password;
    submitData.dob = req.body.dob;
    submitData.country = req.body.country;
    submitData.gender = req.body.gender;
    submitData.preference = req.body.preference;
    submitData.save((err, r_User) => {
        if (err) {
            console.log(err);
            res.send({ message: 'save record error', status: "error" });
        } else {
            
            console.log(r_User);
            res.send({ message: 'Successfully Saved User Details', status: "success" });
        }
    })

});

//3) Update User
app.put('/updateUser/:id', (req, res) => {
    
    var  vals = req.params.id;
    var myString = req.params.id;
    var newString = myString.substr(1);
    console.log('Put Update req.params.id : ' + req.params.id );

    User.findOneAndUpdate({ _id: newString }, { $set: { 
        name : req.body.name,
        email : req.body.email,
        password : encrptValue(req.body.password),
        dob : req.body.dob,
        country : req.body.country,
        gender : req.body.gender,
        preference : req.body.preference
    } 
    }, { upsert: true ,'new': true},
        (err, new_user) => {
            if (err) {
                console.log('Update User : Error' + err );
                res.send('error updating')
            } else {
                console.log('User Updated Sccessfully ! ' + new_user);
                res.send(new_user)
            }
        })
})



//4) Delete User
app.delete('/users/:id', (req, res) => {
    var myString = req.params.id;
    var newString = myString.substr(1);
    //User.findOneAndRemove({ _id: mongoose.Types.ObjectId(newString) }, (err, r_users) => {
        User.findOneAndRemove({ _id: newString }, (err, r_users) => {
        if (err) {
            console.log('delete log error' + err);
            res.send({ message: 'Remove User Failed.', status: 'error' })
        } else {
            res.send({ message: 'User Deleted Successfully.', status: 'success' })
        }
    })
})

function encrptValue(passwordVal){
    const cipher = crypto.createCipher('aes-256-ctr', 'a password','1z3FtB6OitmFOIsP');
    var encrypted = cipher.update(passwordVal, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log('encrypted : ' +encrypted);
    return encrypted;
}

function decryptValue(passwordVal){
    const decipher = crypto.createDecipher('aes-256-ctr', 'a password','1z3FtB6OitmFOIsP');
    console.log('passwordVal : ' + passwordVal);
    var encrypted = encrptValue(passwordVal) ;
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(' decrypted :' + decrypted);
    return decrypted;
}

app.listen(port, () => {   
    console.log("Server listening on port " + port);
});