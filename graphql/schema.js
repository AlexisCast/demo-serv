const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Product {
    _id: ID!
    name: String!
    slugname: String
    price: Float!
    priceDiscount: Float
    description: String!
    available: Boolean
    img: String 
    state: String
    status: String
    updatedAt: String
    createdAt: String
  }

  type ProductsData {
    products: [Product!]!
    totalProducts: Int!
  }

  type TestData {
    text: String!
    views: Int!
  }

  type RootQuery {
    hello: TestData!
    products: ProductsData!
  }

  schema {
    query: RootQuery
  }
`);
