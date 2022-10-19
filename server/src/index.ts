import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import { createServer } from "http";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { WebSocketServer } from "ws";
import { mongo } from "./mongo";
import { MemberResolver } from "./resolvers/member";
import { MessageResolver } from "./resolvers/message";
import { ConversationResolver } from "./resolvers/conversation";
import { UserResolver } from "./resolvers/user";

dotenv.config();

const main = async () => {
  const app = express();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000"],
      credentials: false,
    })
  );

  const httpServer = createServer(app);

  const schema = await buildSchema({
    resolvers: [
      MessageResolver,
      ConversationResolver,
      UserResolver,
      MemberResolver,
    ],
    emitSchemaFile: path.resolve("./server.gql"),
    validate: false,
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/subscriptions",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await mongo();
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
  });

  httpServer.listen(process.env.PORT, () => {
    console.log(
      `Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
    );
  });
};

main().catch((err) => {
  console.log(err);
});
