const CryptoJS  = require('crypto-js');
require('dotenv').config()


const generateSignature = async (body) => {

  const signature = CryptoJS.HmacSHA256( body, 'ntb@ts1').toString();

  return await signature

}


module.exports = {
  generateSignature
}