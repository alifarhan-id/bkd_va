const basicAuth = require('express-basic-auth')

const auth = basicAuth({
    authorizer: (username, password, cb) => {
      const userMatches = basicAuth.safeCompare(username, 'bank_ntb')
      const passwordMatches = basicAuth.safeCompare(password, 'oka_ganteng')
      if (userMatches & passwordMatches)
        return cb(null, true)
      else
        
        return cb(null, false)
    },
    authorizeAsync: true,
  })

  module.exports = {
    auth
  }