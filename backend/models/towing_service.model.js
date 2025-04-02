import mongoose from "mongoose";

const towing_serviceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
}, {
    timestamps:true //createdat, Updateat
});

const Towing_service = mongoose.model('Towing_service',towing_serviceSchema);

export default Towing_service;