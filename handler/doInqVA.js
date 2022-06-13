const express = require('express')
const axios = require('axios');

const URI = require('../config/bankURI')
const generateSignature = require('../config/generateSignature')
const getToken = require('../config/getToken')


const doInqVA = async (req, res) => {
    const body = req.body
    let data = {
        "va": body.va,
        "id_mitra": body.id_mitra,
        "id_produk": body.id_produk
    }

    data = JSON.stringify(data)
    const token  = await getToken.getToken()  //get token
    const signature = generateSignature(data) // get signature

    const config = {
        method: 'post',
        url: URI.requestInqVA,
        headers: { 
          'Content-Type': 'application/json', 
          'token': `${token}`,
          'signature': `${signature}`, 
        },
        data : data
    };

    axios(config)
      .then(function (response) {
        if(response.data.rCode == "001"){
          res.status(400).json({
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
          res.status(401).json({
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