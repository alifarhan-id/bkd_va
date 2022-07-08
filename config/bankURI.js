require('dotenv').config()

let USER_ID = process.env.USER_ID


const URI = {
    requestToken: `http://202.152.22.204:90/payment/api/${USER_ID}/token`,
    requestVA: `http://202.152.22.204:90/payment/api/${USER_ID}/va`,
    requestInqVA:`http://202.152.22.204:90/payment/api/${USER_ID}/inqva`,
    requestUpdateVA: `http://202.152.22.204:90/payment/api/${USER_ID}/updateva`,
    requestReportVA:`http://202.152.22.204:90/payment/api/${USER_ID}/report`,
    requestSetPaymentFlag:`http://202.152.22.204:90/payment/api/${USER_ID}/flag`,
    requestCekStatus:`http://202.152.22.204:90/payment/api/${USER_ID}/cekstatus`,
   }

module.exports = URI