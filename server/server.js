import app from "./app.js"
import { connectToDb } from './config/connecToDb.js';

//We need to create a port number
const PORT = process.env.PORT || 4000; // when hostin a project, process.env.PORT is supplied by the hostin site, whl 4000 is a fall back

if (!PORT) {
  throw new Error("please ensure you have a port number assigned");
}
//we are trying to check if there is no port below
connectToDb()//invoking connecToDb
  .then(() => startServer())//call a functio n start server
  .catch((error) => {
    console.error("Invalid database connection", error);
  });
//Then we create the start server function above cos it doesnt exist. and we want to listen to the port number that was supplied on the vaiable PORT above
function startServer() {
  app.listen(PORT, (error) => {// we r usin dz to listen to connectToDb on a port number
    // the app here is the express that stores our data
    if (error) {// we accounting for error
      console.log("Cannot connect to server", error);
    } else {// otherwise
      console.log(`Server is connected to port ${PORT}`);// tmplate literal used to reference a variable in a string
    }
  });
}
