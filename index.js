'use strict'

var crypto = require('crypto')

var authme = function() { }

function strcasecmp(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase()
}
function sha1(txt) {
    return crypto.createHash('sha1').update(txt).digest('hex')
}
function sha256(txt) {
    return crypto.createHash('sha256').update(txt).digest('hex')
}
function whirlpool(txt) {
    return crypto.createHash('whirlpool').update(txt).digest('hex')
}
function md5(txt) {
    return crypto.createHash('md5').update(txt).digest('hex')
}
function createSalt() {
    return crypto.randomBytes(16).toString('hex')
}

authme.prototype.compare = function(algorithm, password, hash_password) {
    switch (algorithm.toLowerCase()) {
        case 'sha1': {
            return strcasecmp(hash_password, sha1(password))
        }
        case 'sha256': {
            var shaInfo = hash_password.split('$')
            var password2 = sha256(password) + shaInfo[2]
            return strcasecmp(shaInfo[3], sha256(password2))
        }
        case 'whirlpool': {
            return strcasecmp(hash_password, whirlpool(password))
        }
        case 'md5': {
            return strcasecmp(hash_password, md5(password))
        }
        case 'md5vb': {
            var info = hash_password.split('$')
            var password2 = md5(password) + info[2]
            return strcasecmp(info[3], md5(password2))
        }
        case 'plaintext': {
            return hash_password == password
        }
        default: {
            return false
        }
    }
}

authme.prototype.hash = function(algorithm, password) {
    switch (algorithm.toLowerCase()) {
        case 'sha1': {
            return sha1(password)
        }
        case 'sha256': {
            var salt = createSalt()
            return '$SHA$' + salt + '$' + sha256(sha256(password) + salt) 
        }
        case 'whirlpool': {
            return whirlpool(password)
        }
        case 'md5': {
            return md5(password)
        }
        case 'md5vb': {
            var salt = createSalt()
            return '$MD5vb$' + salt + '$' + md5(md5(password) + salt)
        }
        case 'plaintext': {
            return password
        }
        default: {
            return 'invalid'
        }
    }   
}

module.exports = new authme()