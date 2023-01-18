require("dotenv/config");
const express = require("express");
const cors = require("cors");

const indexRoute = require("./routes/index.js");
const loginRoute = require("./routes/login.js");
const ordersRoute = require("./routes/orders.js");

// Initialize server
const app = express();
const PORT = process.env.PORT;

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes to handle
app.use("/", indexRoute);
app.use("/login", loginRoute);
app.use("/orders", ordersRoute);


app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server up and listening on port: ${PORT}`);
    else
        console.log("Cannot start server...", error);
});