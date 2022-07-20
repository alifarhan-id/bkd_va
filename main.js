const express = require('express')
const swaggerDocs = require('./swagger')
const cors = require('cors')
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/indexRoutes')
const front = require('./routes/frontend')
const app = express()
const port = 3231


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');



app.get('/bkd/va/', (req, res) =>{
  res.render('index')
})

app.use('/payment/va/', indexRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  swaggerDocs(app, port)
})