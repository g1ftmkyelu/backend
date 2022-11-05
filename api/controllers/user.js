exports.displayMessage=(req, res)=>{
    console.log("this is the home endpoint");
    res.send("this is the home endpoint");
}


exports.displayMessage2=(req, res)=>{
    console.log("this is another message");
    res.send("this is another message");
}


