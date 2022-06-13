const URI = require('./bankURI')
const axios  = require('axios');
require('dotenv').config()

const getToken = async () => {
    try{
      const data = JSON.stringify({
          user_id: `${process.env.USER_ID}`,
          user_secret: `${process.env.USER_SECRET}`,
          id_mitra: `${process.env.ID_MITRA}`
        });
        
        var config = {
          method: 'post',
          url: URI.requestToken,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        let getToken = await axios(config)
          .then((response) => {
                return response.data.data.token
          })
          .catch( (error) => {
            return error
          });
        
          return await getToken

        
    }catch(e){
      console.log(e)
    }
}
// async function tes(){
//   data  = await getToken()
//   console.log(data)
//   return data
// }

// data =  tes()
// console.log("ini data : " + data)


module.exports = {
  getToken
}