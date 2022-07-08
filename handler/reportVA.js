const express = require('express')
const axios = require('axios');

const URI = require('../config/bankURI')
const getSignature = require('../config/generateSignature')
const getToken = require('../config/getToken')

const doGetReportVA = async(req, res) => {
    const body = req.body
    let data = {
        "id_mitra": body.id_mitra,
        "tglawal": body.tglawal,
        "tglakhir": body.tglakhir
    }

    data = JSON.stringify(data)

    const token  = await getToken.getToken()  //get token
    const signature = await getSignature.generateSignature(data) // get signature
    const config = {
        method: 'post',
        url: URI.requestReportVA,
        headers: { 
          'Content-Type': 'application/json', 
          'token': `${token}`,
          'signature': `${signature}`, 
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        if(response.data.rCode == "002"){
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
        if(response.data.rCode == "006"){
          res.status(401).json({
            rCode: response.data.rCode,
            message: response.data.message,
          })
        }
        if(response.data.rCode == "007"){
          res.status(403).json({
            rCode: response.data.rCode,
            message: response.data.message,
          })
        }

        if(response.data.rCode == "000"){
          res.status(200).json({
            rCode: response.data.rCode,
            message: response.data.message,
            data:response.data.data
          })
        }


      })
      .catch( (error) => {
        res.status(500).json({
          rCode: 500,
          message: "Something error in server, Please try again later"
        })
      });
}


module.exports = {
  doGetReportVA
}