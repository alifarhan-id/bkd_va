const express  = require('express')

const getVA = require('../handler/doGetVa')
const inqVA = require('../handler/doInqVA')

const router = express.Router()



router.get('/', (req, res, next) =>{
    res.status(200).json({
        message:"heelo fools", 
    })
})

router.post('/getva', (req, res)=>{
    getVA.doGetVA(req, res)
})
router.post('/inqva', (req, res)=>{
    getVA.doGetVA(req, res)
})


module.exports =  router