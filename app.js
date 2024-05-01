const { createHandler } = require('graphql-http/lib/use/express');
const express = require('express');
const morgan = require('morgan');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//	1) Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('hello!');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//	3) Routes
// Create and use the GraphQL handler.
app.use(
  '/graphql',
  createHandler({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
  }),
);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
