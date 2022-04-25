const express = require("express");
const { dbConnect } = require("./config/dbConnect");
const {authRouter} = require("./routes/auth.router");
const {productRouter} = require("./routes/products.router");


const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productRouter)

const start = async () => {
    await dbConnect();

    app.listen(8080, () => {
        console.log("Server up and running")
    });
};

start();