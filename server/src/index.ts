import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createServer } from "http";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import cors from "cors";
import dotenv from "dotenv";
import { ChatResolver } from "./resolvers/chat";

dotenv.config();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: false,
// };

const main = async () => {
  const app = express();
  const httpServer = createServer(app);

  const schema = await buildSchema({
    resolvers: [ChatResolver],
    validate: false,
  });
  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: "/graphql",
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  // app.use(cors(corsOptions));

  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
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
    // subscriptions: {
    //   path: "/subscriptions",
    //   onConnect: () => {
    //     console.log("Client connected for subscriptions");
    //   },
    //   onDisconnect: () => {
    //     console.log("Client disconnected from subscriptions");
    //   },
    // },
  });

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
