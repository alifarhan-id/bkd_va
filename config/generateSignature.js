const {createHmac} = require('node:crypto');
require('dotenv').config()
  
// body = {"va":"01100622003",
// "id_mitra":"006",
// "id_produk":"01",
// "name":"sitamvan",
// "billing_type":"o",
// "email":"sitamvan@bkdmtr.go.id",
// "phone":"081917567890",
// "datetime_expired":"2022-06-10 12-49-00",
// "description":"pembayaran BPHTB",
// "tagihan":"9500000"}
//body = JSON.stringify(body)

const generateSignature = async (body) => {

  const hmac = createHmac('sha256', 'ntb@ts1');
  let signature = null
  
  hmac.on('readable', () => {
    const data = hmac.read();
    if (data) {
       signature = data.toString('hex')
    }
  });
  
  hmac.write(body);
  hmac.end();

  return await signature

}
// out = generateSignature(body)
// console.log(out)

module.exports = {
  generateSignature
}