import mongoose from "mongoose";

async function connectToDB(){
  mongoose.connect(process.env.BD_CONNECTION_STRING);
  return mongoose.connection;
}

export default connectToDB;
