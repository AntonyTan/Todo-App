const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require ("dotenv").config();

const PORT = process.env.PORT || 5000

//middleware

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "client/build")))
}
//routes

//register and login routes

app.use("/auth", require('./server/routes/jwtAuth'))

//dashboard routes

app.use("/dashboard", require('./server/routes/dashboard'));

//todo routes

app.use("/todo", require('./server/routes/todo'));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
})

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})
