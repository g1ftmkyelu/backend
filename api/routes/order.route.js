const express =require("express");
const router=new express.Router();
const orderController=require("../controllers/order.controller")
const auth=require("../middlewares/authenticate")


router.post("/createOrder", auth, orderController.addOrder);
router.get("/getOrders", auth, orderController.getAllOrders);
router.get("/getOrder/:id", auth, orderController.getOrder);
router.patch("/update/:id", auth, orderController.updateOrder);
router.delete("/delete/:id", auth, orderController.deleteOrder);



module.exports=router;