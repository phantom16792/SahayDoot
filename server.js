const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({path : "./.env"});

const DB = process.env.DATABASE;
const PORT = process.env.PORT || 3001;

async function connectDB() {

    try {
         await mongoose.connect(DB);
         console.log("DB connected successfully");
         mongoose.set("debug",true);
        
    } catch (error) {
        console.log(error);
    }
    
}
connectDB();

app.listen(PORT, ()=>{
    console.log(`server is runninng on PORT : ${PORT}`);
});



