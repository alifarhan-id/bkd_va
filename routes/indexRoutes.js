const express  = require('express')


const getVA = require('../handler/doGetVa')
const inqVA = require('../handler/doInqVA')
const updateVA = require('../handler/doUpdateVA')
const reportVA = require('../handler/reportVA')
const flag = require('../handler/setFlag')
const status = require('../handler/cekStatus')
const auth = require('../config/basicAuth')

const bkdCallback = require('../handler/callbackBankVA')
// const auth = require('../config/basicAuth')

//models search sspd
const sspdVA = require('../models/sspdVA')

const app = express()
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
    inqVA.doInqVA(req, res)
})
router.post('/updateva', (req, res)=>{
    updateVA.doUpdateVA(req, res)
})
router.post('/report', (req, res) => {
    reportVA.doGetReportVA(req, res)
})
router.post('/flag', (req, res) => {
    flag.doSetPaymentFlag(req, res)
})
router.post('/cekstatus', (req, res) => {
    status.doCekStatus(req, res)
})



router.post('/search_sspd', (req, res) => {
    sspdVA.doSearchSSPD(req, res)
})


router.post('/callback', auth.auth, (req, res) => {
    bkdCallback.callbackBKD(req, res)
})

module.exports =  router