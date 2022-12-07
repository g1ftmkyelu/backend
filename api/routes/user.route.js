const express =require("express");
const router=new express.Router();
const userController=require("../controllers/user.controller")
const auth=require("../middlewares/authenticate")


router.post("/signup", userController.signup);
router.get("/getUsers", auth, userController.getUsers);
router.post("/login", userController.login);
router.get("/getUsers/:id", userController.getOne);
router.patch("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);



module.exports=router;