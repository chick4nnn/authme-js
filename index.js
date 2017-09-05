'use strict'

var crypto = require('crypto')

var authme = function() { }

function strcasecmp(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase()
}
function sha256(txt) {
    return crypto.createHash('sha256').update(txt).digest('hex')
}
function createSalt() {
    return crypto.randomBytes(16).toString('hex')
}

authme.prototype.compare = function(password, hash_password) {
    var shaInfo = hash_password.split('$')
    var password2 = sha256(password) + shaInfo[2]
    return strcasecmp(shaInfo[3], sha256(password2))
}

authme.prototype.hash = function(password) {
    var salt = createSalt()
    return '$SHA$' + salt + '$' + sha256(sha256(password) + salt)    
}

module.exports = new authme()