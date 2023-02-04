require("dotenv/config");
const express = require("express");
const cors = require("cors");

const indexRoute = require("./routes/index.js");
const loginRoute = require("./routes/login.js");
const registerRoute = require("./routes/register.js");
const usersRoute = require("./routes/users.js");
const ordersRoute = require("./routes/orders.js");
const verifyJWT = require("./middleware/verifyJWT.js");

// Initialize server
const app = express();
const PORT = process.env.PORT;

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes to handle
app.use("/", indexRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/users", usersRoute);
app.use("/orders", verifyJWT, ordersRoute);

app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server up and listening on port: ${PORT}`);
    else
        console.log("Cannot start server...", error);
});