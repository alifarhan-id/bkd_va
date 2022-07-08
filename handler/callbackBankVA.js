const pool = require('../config/db')
const sspd = require('../models/sspdVA')

const callbackBKD = async (req, res) => {
  let body = req.body
  let data = {
    "va": body.va,
    "name": body.name,
    "description": body.description,
    "tagihan": body.tagihan,
    "payment_amount": body.payment_amount,
    "datetime_payment": body.datetime_payment,
    "id_produk":body.id_produk,
    "no_rrn": body.no_rrn
  }

  try{
    responseUpdateStatus = await sspd.doCallbackUpdateVA(1, data.va, data.no_rrn)

    if(responseUpdateStatus != undefined){
      res.status(200).json({
        rCode:"000",
        data:{
          va:responseUpdateStatus.va
        }
      })
    }
  else{
      res.status(400).json({
        rCode:"001",
        message: "VA Not Found"
      })

    }

  }catch(e){
    res.status(500).json({
      rCode:"009",
      message: "Another Erorr"
    })
  }

}


module.exports = {
  callbackBKD
}