const express = require('express')
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/indexRoutes')
const app = express()
const port = 3231

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send('Hello fools')
// })

app.use('/bkd_payment/va/', indexRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})