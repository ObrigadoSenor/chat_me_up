import { connection, connect } from "mongoose";
import { env } from "process";

export const mongo = async () => {
  const uri = env.MONGO_DB_URI || "";

  connection.on("connected", () =>
    console.log("Mongoose is connected successfully")
  );
  connection.on("disconnected", () =>
    console.log("Mongoose is disconnected successfully")
  );
  connection.on("error", (err) => console.log(`Mongoose error: ${err}`));

  return await connect(uri, {});
};
