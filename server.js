const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000

app.use(cors());

app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile("index.html")
})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})