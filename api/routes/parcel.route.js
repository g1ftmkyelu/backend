const express =require("express");
const router=new express.Router();
const parcelController=require("../controllers/parcel.controller")
const auth=require("../middlewares/authenticate")


router.post("/createParcel", auth, parcelController.addParcel);
router.get("/getParcels", auth, parcelController.getAllParcels);
router.get("/getParcel/:id", auth, parcelController.getParcel);
router.patch("/update/:id", auth, parcelController.updateParcel);
router.delete("/delete/:id", auth, parcelController.deleteParcel);



module.exports=router;