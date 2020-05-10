var express = require('express');
var router = express.Router();

var crypto = require('crypto');

router.get('/', function(req, res, next) {
    var cipher = crypto.createCipher('aes-192-ccm', 'oursecret123');
    var encrypted = cipher.update('yourPassword123', 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log ('Encrypted : ' + encrypted);
    res.send(encrypted + " this is encrypted form..");
});

module.exports = router;