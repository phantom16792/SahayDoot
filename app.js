const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());


const userRoutes = require("./routes/userRoutes");
const responderRoutes = require("./routes/responderRoutes");
const sosRoutes = require("./routes/sosRoutes"); 

app.use(express.static(path.join(__dirname,"public")));

app.use((req,res,next) =>{
    console.log("Hello from middleware stack 🤞");
    next(); 
});

app.use("/api/v1/sos",sosRoutes);
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/responders",responderRoutes);

module.exports = app;



