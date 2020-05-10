// var crypto    = require('crypto');
// var text      = 'I love cupcakes';
// var secret    = 'abcdeg'; //make this your secret!!
// var algorithm = 'sha1';   //consider using sha256
// var hash, hmac;

// // Method 1 - Writing to a stream
// hmac = crypto.createHmac(algorithm, secret);    
// hmac.write(text); // write in to the stream
// hmac.end();       // can't read from the stream until you call end()
// hash = hmac.read().toString('hex');    // read out hmac digest
// console.log("Method 1: ", hash);

// // Method 2 - Using update and digest:
// hmac = crypto.createHmac(algorithm, secret);
// hmac.update(text);
// hash = hmac.digest('hex');
// console.log("Method 2: ", hash);

// const crypto = require('crypto');  
// const decipher = crypto.createDecipher('aes192', 'a password');  
// var encrypted = '4ce3b761d58398aed30d5af898a0656a3174d9c7d7502e781e83cf6b9fb836d5';  
// var decrypted = decipher.update(encrypted, 'hex', 'utf8');  
// decrypted += decipher.final('utf8');  
// console.log(decrypted); 