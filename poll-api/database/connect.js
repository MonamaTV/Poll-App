const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//Connection to the database
module.exports.connectToDatabase = mongoose.connect(process.env.MONGO_DB_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }, () => {
        console.log("Database is up")
    }
);