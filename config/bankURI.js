require('dotenv').config()

let USER_ID = process.env.USER_ID


const URI = {
    requestToken: `http://202.152.22.204:90/payment/api/${USER_ID}/token`,
    requestVA: `http://202.152.22.204:90/payment/api/${USER_ID}/va`,
    requestInqVA:`http://202.152.22.204:90/payment/api/${USER_ID}/va`
   }

module.exports = URI