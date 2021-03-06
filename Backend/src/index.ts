import express from 'express';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { RESOLVERS } from './gql';
import createDatabaseConnection from './database/dbConnection';
import { getConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';
import { GraphQLSchema } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';

require('dotenv').config();

useContainer(Container);

const establishDatabaseConnection = async (): Promise<void> => {
  try {
    await createDatabaseConnection();
  } catch (error) {
    console.error(error);
  }
};

const initExpressGraphql = async () => {
  const app = express();
  const redis = new Redis();
  const RedisStore = connectRedis(session);

  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

  const schema = await buildSchema({
    resolvers: RESOLVERS,
    container: Container,
  });

  const apolloServer = new ApolloServer({
    schema: schema as GraphQLSchema,
    context: ({ req, res }: any) => ({ req, res }),
    introspection: true,
    plugins: [
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection, // for use with TypeORM
      }),
    ],
  });

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'rds',
      secret: 'verysecretdata',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        sameSite: 'lax',
      },
    })
  );

  apolloServer.applyMiddleware({
    app,
    cors: corsOptions
  }) 

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

const startServer = async (): Promise<void> => {
  await establishDatabaseConnection();
  initExpressGraphql();
};

startServer();
