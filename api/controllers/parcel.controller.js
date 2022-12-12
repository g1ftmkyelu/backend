const Parcel=require("../models/parcel.model")

exports.addParcel=async (req, res)=>{
    try {
        const {weight, contents, fragile}=req.body;
        console.log(req.user);
        const selectedParcel= await Parcel.findOne({weight:weight, contents:contents, fragile:fragile}).exec();
        if(selectedParcel) return res.status(200).json({success:true, message:"parcel already exists"})
        const newParcel= new Parcel({
            weight:weight,
            contents:contents,
            fragile:fragile
        })
    
        await newParcel.save();
        return res.status(200).json({success:true, message:"parcel added successfully!"})
               
    } catch (error) {
    return res.status(400).json({message:error.message})
}}


exports.getAllParcels=async (req, res)=>{
    try {
        const allParcels=await Parcel.find().exec();
        return res.status(200).json({success:true, parcel:allParcels});               
    } catch (error) {
    return res.status(400).json({message:error.message})
}}



exports.getParcel=async (req, res)=>{
    try {
        const {id}=req.params;
        const selectedParcel= await Parcel.findById(id).exec();
        return res.status(200).json({success:true, parcel:selectedParcel});
    } catch (error) {
    return res.status(400).json({message:error.message})
}}



exports.updateParcel=async (req, res)=>{
    try {
        const {id}=req.params;
        const { weight, contents, fragile} = req.body;
        const selectedParcel= await Parcel.findById(id).exec();

        selectedParcel.weight=weight;
        selectedParcel.contents=contents;
        selectedParcel.fragile=fragile;

        await selectedParcel.save();
        return res.status(200).json({message:'parcel updated successfully!'});

                 
    } catch (error) {
    return res.status(400).json({message:error.message})
}}

exports.deleteParcel=async (req, res)=>{
    try {

        const{id}=req.params;
        await Parcel.findOneAndDelete({_id:id}).exec();
        await res.status(200).json({success:true, message:"parcel deleted successfully"});
               
    } catch (error) {
    return res.status(400).json({message:error.message})
}}







