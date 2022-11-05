const express =require("express");
const router=new express.Router();
const userController=require("../controllers/user")

router.get("/home", userController.displayMessage);
router.get("/anotherEndpoint", userController.displayMessage2);


module.exports=router;