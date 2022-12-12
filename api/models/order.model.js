const mongoose= require('mongoose')

const orderSchema=mongoose.Schema({
    deliveryMethod:{type:String, required:true, default:'office collection'},
    sender:{type:String, required:true},
    reciever:{type:String, required:true},
    parcel:{type:String, required:true}

});

module.exports= mongoose.model('order', orderSchema);