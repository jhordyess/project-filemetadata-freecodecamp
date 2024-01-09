const express = require('express')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', (_, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.listen(port, () => {
  console.log('Your app is listening on port ' + port)
})
