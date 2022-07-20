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

/** 
 * @swagger
 * components:
 *  schemas:
 *   VA:
 *    type: object
 *    required:
 *     - va
 *     - name
 *     - tagihan
 *     - payment_amount
 *     - datetime_payment
 *     - id_produk
 *     - no_rrn
 *              
 *    properties:
 *     va:
 *      type: string
 *      maxLength: 16
 *      description: va number
 *     name:
 *      type: string
 *      maxlength: 60
 *      description: name of wajib pajak
 *     description:
 *      type: string
 *      maxlength: 60
 *      description: description of payment
 *     tagihan:
 *      type: number
 *      maximum: 14
 *      description: nominal tax bill
 *     payment_amount: 
 *      description: total payment amount
 *      type: number
 *      maximum: 14
 *     datetime_payment: 
 *      description: datetime of payment
 *      type: number
 *     id_produk:
 *      description: prdouct id
 *      type: string
 *      maxlength: 2
 *     no_rrn:
 *      description: RRN number 
 *      type: string
 *      maxlength: 12
 *       
*/

 /**
 * @swagger
 *   components:
 *      securitySchemes:
 *          basicAuth:
 *              type: http
 *              scheme: basic
 * '/callback':
 *  post:
 *     security:
 *           - basicAuth: []
 *     tags:
 *     - Callback BANK NTB
 *     summary: send callback information to update status payment bkd side
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            items:
 *             $ref: '#/components/schemas/VA'
 *            required:
 *              - va
 *              - name
 *            properties:
 *              va:
 *                type: string
 *                default: va number 
 *              name:
 *                type: string
 *                default: wp name 
 *              description:
 *                type: string
 *                default: description of payment 
 *              tagihan:
 *                type: string
 *                default: tax bill
 *              payment_amount:
 *                type: string
 *                default: payment amount
 *              datetime_payment:
 *                type: string
 *                default: date time of payment with format (YYYY-MM-DD)
 *              id_produk:
 *                type: string
 *                default: product ID
 *              no_rrn:
 *                type: string
 *                default: rrn number
 *  
 *     responses:
 *      '200':
 *        description: success
 *      '400':
 *        description: VA not found
 *      '401':
 *          description: Authentication information is missing or invalid
 *      '500':
 *        description: another error
 */
})

module.exports =  router