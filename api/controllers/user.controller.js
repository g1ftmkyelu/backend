const User= require('../models/user.model')
const JWT=require('jsonwebtoken')
const Bcrypt=require('bcrypt')


exports.signup= async (req, res)=>{
 try {
    const {firstName, lastName, phoneNumber, email, password, role } = req.body;
    const salt=await Bcrypt.genSalt()
	const hashedPassword=await Bcrypt.hash(password, salt)

    const selectedUser= await User.findOne({phoneNumber:req.body.phoneNumber, email:req.body.email}).exec();

    if(selectedUser)return res.status(500).json({message:"user email or phone number already exists!"})

    const newUser= new User({
        firstName:firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email:email,
        password:hashedPassword,
        role:role
    })

    await newUser.save();
    return res.status(200).json({message:"user registered successfully!"})
 }
 
 catch (error){
    return res.status(400).json({message:error.message})
 }
}

exports.getUsers=async (req, res)=>{
    try {


       const accessToken=process.env.ACCESS_TOKEN_SECRET;
       
       
       const allUsers= await User.find().exec();
       return res.status(200).json({users:allUsers});
    
    }
    
    catch (error){
        return res.status(400).json({message:error.message})
    }
   }

exports.login=async (req, res)=>{
    try {

       const {email, password}= req.body;
       const user=await User.findOne({email:email}).exec();
       if(user){
        if(!await Bcrypt.compare(password, user.password))return res.status(400).json({message:'wrong password'})
        //jwt
        const accessToken=JWT.sign(JSON.parse(JSON.stringify(user)), process.env.ACCESS_TOKEN_SECRET, {expiresIn: 604800})
        return	res.status(200).json({token:accessToken})
       }else{
        return res.status(404).json({message:'account not found'})
       } 
    }
    
    catch (error){
        return res.status(400).json({message:error.message})
    }
   }

   exports.getOne=async (req, res)=>{
    try {
        const {id}=req.params;
        const selectedUser= await User.findById(id).exec();
        console.log(selectedUser);
        if(!selectedUser)return res.status(404).json({message:"user not found"})
        return res.status(200).json({message:selectedUser})
        
    } catch (error) {
        return res.status(400).json({message:error.message})
    }}

   exports.updateUser=async (req, res)=>{
        try {
            const {id}=req.params;
            const {firstName, lastName, phoneNumber, email, password, role } = req.body;
            const selectedUser= await User.findById(id).exec();

            selectedUser.firstName=firstName;
            selectedUser.lastName=lastName;
            selectedUser.phoneNumber= phoneNumber;
            selectedUser.email=email;
            selectedUser.password=password;
            selectedUser.role=role;

            await selectedUser.save();
            return res.status(200).json({message:'user updated successfully!'});

            
        } catch (error) {
            
    }}

    exports.deleteUser=async (req, res)=>{
        try {
            const {id}=req.params;
            await User.findByIdAndDelete(id).exec();   
            return res.status(200).json({message:'user deleted successfully!'})        
        } catch (error) {
        return res.status(400).json({message:error.message})
    }}

