require("dotenv").config();
const express= require("express");
const UserRoute=require("./api/routes/user.route");
const mongoose = require('mongoose');
const app=new express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


app.use("/user", UserRoute);
//Mongoose setup (database connection)
const url = process.env.CONN_STRING 
mongoose.connect(url,{ useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _=> {
    console.log('database connected', url)
})

db.on('error', err => {
    console.error('connection error:', err)
})

mongoose.Promise = global.Promise;

app.listen(5000,
    ()=>{
        console.log("app listening on port 5000")
    }
    );
