const express  = require('express')

const app = express()
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile('/public/index.html')
});




module.exports =  router