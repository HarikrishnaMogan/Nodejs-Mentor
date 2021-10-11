require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongo = require("./Shared/Mongo");
const studentRoute = require('./Routes/StudentsRoute');
const mentorRoute = require("./Routes/MentorRoute");

const PORT = process.env.PORT || 5000;
const app = express();

let startserver = async()=>{

    await mongo.connect();

    app.use(cors());
    app.use(express.json());

    app.use((req,res,next)=>{
        console.log("logging middleware");
        next();
    })

    app.use("/students",studentRoute);
    app.use('/mentors',mentorRoute);

    app.listen(PORT,()=>{console.log(`server started at ${PORT}`);});
}
startserver();