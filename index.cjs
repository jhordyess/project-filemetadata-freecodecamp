const express = require('express')
const cors = require('cors')
require('dotenv').config()
const multer = require('multer')

const port = process.env.PORT || 3000

const app = express()
const upload = multer()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', (_, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.post('/api/fileanalyse', (req, res, next) => {
  const imageHandler = upload.single('upfile')
  imageHandler(req, res, err => {
    if (err instanceof multer.MulterError) {
      return next(err)
    } else if (err) {
      return next(err)
    }

    const { originalname: name, mimetype: type, size } = req.file
    res.json({ name, type, size })
  })
})

// Error handling middleware
app.use((err, _, res, next) => {
  if (err) res.status(err.status || 500).json({ error: err.message || 'SERVER ERROR' })
  next()
})

app.listen(port, () => {
  console.log('Your app is listening on port ' + port)
})
