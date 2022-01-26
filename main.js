const express = require('express');
const session = require('express-session');
let bodyParser = require('body-parser');
const helmet = require('helmet')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')
const root = require('./src/graphql/resolvers')

let route = require('./src/routes/routeindex.js');
const loggingMiddleware = require('./src/middlewares/loggingMiddleware.js');

const app = express();
const port = 3010;

app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') }))
app.use(loggingMiddleware)
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

app.use(express.static('public'));
app.use(express.json());      
app.use(express.urlencoded());

app.use(session({ 
  secret: 'fkladjsf9ads08f7391r4fdsa232r8fhjeoqr3;fnvhv134789fy3o149hfr34', 
  resave: true,
  saveUninitialized:true
}));

// app.locals.noclient=0;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(route);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
 