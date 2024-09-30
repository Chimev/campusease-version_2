
//Creating Database Connnection
//check the models file next
const { default: mongoose,  } = require("mongoose");

const connection = {};

export const connectToDB = async () => {
    try {
        //checking if connection exist so to avoid reconnection everytime we start our application
        if(connection.isConnected){s
            console.log("Using exisiting connection")
            return;
        }
        const db =  await mongoose.connect(process.env.MONGO);
        //update connection if it is not empty use te existing one
        connection.isConnected = db.connections[0].readyState;
      } catch (error) {
        console.log(error, 'Erro error');
        throw new Error(error)
      }
}




// //NEW CONNECTION
// const mongoose = require("mongoose");

// const connection = {};  // To track connection status

// export const connectToDB = async () => {
//   try {
//     // Avoid reconnecting if already connected
//     if (connection.isConnected) {
//       console.log("Using existing MongoDB connection");
//       return;
//     }

//     // Connecting to the database
//     const db = await mongoose.connect(process.env.MONGO, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     // Update connection state
//     connection.isConnected = db.connections[0].readyState;

//     if (connection.isConnected) {
//       console.log("MongoDB connected successfully");
//     }
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw error;  // No need to wrap error in a new Error object
//   }
// };
