const express = require('express');
const session = require('express-session');
let route = require('./src/routes/routeindex.js');

const app = express();
const port = 3010;

app.use(express.static('public'));

app.use(express.json());      
app.use(express.urlencoded());


app.use(session({ 
  secret: 'fkladjsf9ads08f7391r4fdsa232r8fhjeoqr3;fnvhv134789fy3o149hfr34', 
  resave: true,
  saveUninitialized:true
}));

// app.locals.noclient=0;


app.use(route);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
 