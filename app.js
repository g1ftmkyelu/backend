const express= require("express");
const UserRoute=require("./api/routes/user");

const app=new express();

app.use("/user", UserRoute);

app.listen(5000,
    ()=>{
        console.log("app listening on port 5000")
    }
    );
