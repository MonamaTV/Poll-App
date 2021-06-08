const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

//Database
const database = require("./database/connect");
//Route imports
const pollRouter = require("./routes/polls");

//middlewares
dotenv.config();
app.use(cors());
app.use(express.json());

//@route GET
app.get("/", (req, res) => {
    res.send("We are home")
})
//Route middlewares
app.use("/api/polls", pollRouter);

//Reference the db connection
database.connectToDatabase;

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`)
});