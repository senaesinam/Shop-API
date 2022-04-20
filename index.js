const express = require("express");
const { dbConnect } = require("./config/dbConnect");

const app = express();
app.use(express.json());

const start = async () => {
    await dbConnect();

    app.listen(8080, () => {
        console.log("Server up and running")
    });
};

start();