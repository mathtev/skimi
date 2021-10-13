import express from "express";
import cors from "cors";
import {graphqlHTTP} from 'express-graphql';
import { buildSchema } from "type-graphql";
import { RESOLVERS } from "./gql";
import createDatabaseConnection from "./database/dbConnection";
import { Connection, useContainer } from "typeorm";
import { Container } from 'typedi';
require('dotenv').config()

useContainer(Container);

const establishDatabaseConnection = async (): Promise<void> => {
  try {
    await createDatabaseConnection();
  } catch (error) {
    console.log(error);
  }
};

const initExpressGraphql = async () => {

  const app = express();
  app.use(cors());

  const schema = await buildSchema({
    resolvers: RESOLVERS,
    container: Container,
  });

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }),
  );

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

const startServer = async (): Promise<void> => {
  await establishDatabaseConnection();
  initExpressGraphql();
}

startServer();

