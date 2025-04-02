import mongoose, { model } from "mongoose";

const userDetailSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
    contactNumber:{
        type:Number,
        required:true
    },
     vehicleModel:{
        type:String,
        required:true
    }, 
    vehicleYear:{
        type:String,
        required:true
    }, 
    pickupLocation:{
        type:String,
        required:true
    }, 
    dropLocation:{
        type:String,
        required:true
    }, 
},{
    timestamps:true
});

const UserDetail = mongoose.model ('UserDetail',userDetailSchema);

export default UserDetail;
