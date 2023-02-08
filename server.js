const express = require('express')
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use('/unit-1/investo-website', require('./unit-1/unit1'));
app.use('/unit-2/investo-website', require('./unit-2/unit2'));
app.use('/unit-3/investo-website', require('./unit-3/unit3'));
app.use('/unit-4/investo-website', require('./unit-4/unit4'));
// app.use('/unit-5/investo-website', require('./unit-5/unit5'));
// app.use('/unit-6/investo-website', require('./unit-6/unit6'));
// app.use('/unit-7/investo-website', require('./unit-7/unit7'));

// app.use('/api', unit4Routes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + "/404.html");
})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})