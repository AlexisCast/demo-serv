const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');
const express = require('express');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');
const { appError } = require('./utils/appError');

const productRouter = require('./routes/productRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const userRouter = require('./routes/userRoutes');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');

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
app.use('/api/v1/owners', ownerRoutes);
app.use('/api/v1/users', userRouter);

// Serve the GraphiQL IDE.
app.get('/graphqlIDE', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.all('*', (req, res, next) => {
  next(appError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
