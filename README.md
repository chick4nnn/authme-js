### Install
```
npm install authme-js
```

### Docs
- authme.hash(algorithm, password)
- authme.compare(algorithm, password, hash_password)

### Algorithms
- SHA1
- SHA256
- Whirlpool
- MD5
- MD5VB
- Plaintext

### Example
```javascript
var authmeJS = require('authme-js')

var hashPassword = authmeJS.hash('sha256', '123456')
console.log(hashPassword)

if (authmeJS.compare('sha256', '123456', '$SHA$344358d43314824a3af668a9cec327b6$9d191395b28ac961a022b8554b752c3d809924cdaeef918162526a9f6f898851')) {
  console.log('Logged in!')
} else {
  console.log('Password incorrect!')
}
```

#### It's mostly ready to use!
