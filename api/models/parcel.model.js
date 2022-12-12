const mongoose= require('mongoose')

const parcelSchema=mongoose.Schema({
    weight:{type:Number, required:true},
    contents:{type:Array, required:true, default:[]},
    fragile:{type:Boolean, required:true, default:false}
});

module.exports= mongoose.model('Parcel', parcelSchema);