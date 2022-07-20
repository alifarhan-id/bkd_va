const express = require('express')
const axios = require('axios');

const URI = require('../config/bankURI')
const getSignature = require('../config/generateSignature')
const getToken = require('../config/getToken')
const sspd = require('../models/sspdVA') //insert va to sspd

async function writeVa(va){
  let data = va.slice(1, 11)
  return data
}

const doGetVA = async(req, res) => {
    const body = req.body
    reqVA = await writeVa(body.va)
    let data = {
        "va":reqVA,
        "id_mitra": body.id_mitra,
        "id_produk": body.id_produk,
        "name": body.name,
        "billing_type": body.billing_type,
        "email": body.email,
        "phone":body.phone,
        "datetime_expired": body.datetime_expired,
        "description": body.description,
        "tagihan": body.tagihan
    }
    console.log(`ini va ${reqVA}`)


    data = JSON.stringify(data)
    const token  = await getToken.getToken()  //get token
    const signature = await getSignature.generateSignature(data) // get signature
    const config = {
        method: 'post',
        url: URI.requestVA,
        headers: { 
          'Content-Type': 'application/json', 
          'token': `${token}`,
          'signature': `${signature}`, 
        },
        data : data
    };
    axios(config)
      .then( async function (response) {
        console.log(JSON.stringify(response.data));

        if(response.data.rCode == "000"){
          data = await sspd.doInsertVaToSspd
          await sspd.doInsertVaToSspd(response.data.data.va,body.va)
          res.status(200).json({
            rCode: response.data.rCode,
            message: response.data.message,
            data:response.data.data
          })
        }

        if(response.data.rCode == "004"){
          res.status(400).json({
            rCode: response.data.rCode,
            message: response.data.message,
          })
        }
        if(response.data.rCode == "999"){
          res.status(401).json({
            rCode: response.data.rCode,
            message: response.data.message,
          })
        }
        if(response.data.rCode == "002"){
          res.status(401).json({
            rCode: response.data.rCode,
            message: response.data.message,
          })
        }
        if(response.data.rCode == "005"){
          res.status(403).json({
            rCode: response.data.rCode,
            message: response.data.message,
          })
        }
        if(response.data.rCode == "006"){
          res.status(404).json({
            rCode: response.data.rCode,
            message: response.data.message,
          })
        }
        if(response.data.rCode == "007"){
          res.status(401).json({
            rCode: response.data.rCode,
            message: response.data.message,
          })
        }

       


      })
      .catch( (error) => {
        console.log("ini error : ", error)
        res.status(500).json({
          rCode: 500,
          message: "Something error in server, Please try again later"
        })
      });

}

module.exports = {
    doGetVA
}




