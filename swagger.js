const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const auth = require('./config/basicAuth')


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'BKD payment',
        description: 'callback va bank ntb ',
        version: '1.0.0',
      },
      securityDefinitions: {
        basicAuth: {
          name:   'Authorization',
          schema: {
            type: 'basic',
            in:   'header'
          },
          value:  'Basic <bank_ntb:oka_ganteng>'
        }
        
      },
      servers: [
        {
            url: "http://localhost:3231/bkd_payment/va/", // url
            description: "dev server", // name
        },
     ],
    },
    // looks for configuration in specified directories
    
    apis: ['./routes/*.js'],
  };
  
  const swaggerSpec = swaggerJsdoc(options)

  function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })
  }
  
  module.exports = swaggerDocs
  