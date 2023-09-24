import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { createClient } from "redis";
import session from "express-session";
import RedisStore from "connect-redis";

import { AppDataSource } from "./configs/db";
import { HelloResolver } from "./resolvers/hello";
// import { PostResolver } from "./resolvers/post";
import { UserResolver } from "@resolvers/user";
import { PRODUCT } from "./constants";
import { InventoryResolver } from "@resolvers/inventory";
import configs from "./configs";
// import { Category } from "./entities/category";
// import { Product } from "./entities/product";
// import { Subcategory } from "./entities/subcategory";
// import { Supplier } from "./entities/suplier";
// import { Uom } from "./entities/uom";
// import { Warehouse } from "./entities/ware-house";

const main = async () => {
  const app = express();

  if (configs.postgres.enable) {
    await AppDataSource.initialize();
    console.log("Connect to db succeed");
  }

  const redisClient = createClient();
  await redisClient.connect().catch((e) => console.error(e));

  const redisStore = new (RedisStore as any)({
    client: redisClient,
    disableTouch: true,
  });

  app.use(
    session({
      name: "qid",
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: PRODUCT, // cookie only works in https
      },
      saveUninitialized: false,
      secret: configs.app.secret,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, InventoryResolver],
      emitSchemaFile: true,
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
