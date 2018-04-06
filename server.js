const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const volleyball = require('volleyball');
const { conn } = require('./server/db/models');

app.use(volleyball);
//app.use(body)

app.use('/api', require('./server/router'));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

conn.sync()
  .then(()=>{
    console.log('postgres server is running!!!');
    app.listen(port, (err) => {
      if (err) throw err;
      console.log(`listening port on ${port}!!!`)
    })
  })
  .catch(console.error)
