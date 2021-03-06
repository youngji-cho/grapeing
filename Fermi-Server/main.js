const express =require('express');
const path =require('path');
const app = express();
const mysql = require('mysql');

const economic=require('./router/economic');
const energy_data=require('./router/energy_data');
const cors= require('cors');

if(process.env.NODE_ENV=='production'){
  console.log("Production Mode");
  process.env.PORT=3000;
  app.use(function(req, res, next) {
    if((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
      res.redirect('https://' + req.get('Host') + req.url);
    } else
      next();
    });
} else if(process.env.NODE_ENV=='development'){
  console.log("Development Mode")
  process.env.PORT=4000
  app.use(cors());
}
app.use('/economic',economic.router);
app.use('/energy_data',energy_data.router);
app.use('/',express.static(path.resolve(__dirname, './../Fermi-Client')));
app.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, './../Fermi-Client/index.html'));
  console.log(process.argv)
});

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}
module.exports = app;
