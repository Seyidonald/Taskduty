//ESTABLISHING CONNECTION TO OUR DATA BASE
import mongoose from 'mongoose';

let isConnected = false;

export const connectToDb = async () => {
  if (isConnected) {
    console.log('Already connected to the database.'); // this is used to check if connected
    return true;
  }
  try {
    // this is used to connect if not connected
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'TaskNotes', //database name
    });
    isConnected = true;
    console.log('MongoDb is connected'); //this is to establish we are already connected
    return true;
  } catch (error) {
    // here we are accomodating errors if any
    console.log('Failed to connect to MongoDb, error', error);
    return false;
  }  
};
