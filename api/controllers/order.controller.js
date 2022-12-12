const Order=require("../models/order.model")

exports.addOrder=async (req, res)=>{
    try {
           const {deliveryMethod, sender, reciever, parcel}=req.body;   
           const selectedOrder= await Order.findOne({parcel:parcel}).exec();
        if(selectedOrder) return res.status(200).json({success:true, message:"order already exists"})
        const newOrder= new Order({
            deliveryMethod:deliveryMethod,
            sender:sender,
            reciever:reciever,
            parcel:parcel
        })
    
        await newOrder.save();
        return res.status(200).json({success:true, message:"order added successfully!"})
    } catch (error) {
    return res.status(400).json({message:error.message})
}}


exports.getAllOrders=async (req, res)=>{
    try {
        const allOrders=await Order.find().exec();
        return res.status(200).json({success:true, orders:allOrders});
    } catch (error) {
    return res.status(400).json({message:error.message})
}}



exports.getOrder=async (req, res)=>{
    try {
        const {id}=req.params;
        const selectedOrder= await Order.findById(id).exec();
        return res.status(200).json({success:true, orders:selectedOrder});
               
    } catch (error) {
    return res.status(400).json({message:error.message})
}}



exports.updateOrder=async (req, res)=>{
    try {
        const {id}=req.params;
        const {deliveryMethod, sender, reciever, parcel}=req.body;   
        const selectedOrder= await Order.findById(id).exec();

        selectedOrder.deliveryMethod=deliveryMethod;
        selectedOrder.sender=sender;
        selectedOrder.reciever=reciever;
        selectedOrder.parcel=parcel;

        await selectedOrder.save();
        return res.status(200).json({message:'order updated successfully!'});
    } catch (error) {
    return res.status(400).json({message:error.message})
}}

exports.deleteOrder=async (req, res)=>{
    try {
          const{id}=req.params;
          await Order.findByIdAndDelete(id).exec();
          return res.status(200).json({success:true, message:"Order deleted successfully"});     
    } catch (error) {
    return res.status(400).json({message:error.message})
}}







