import mongoose from "mongoose";

const {Schema,model}=mongoose


const notificationSchema= new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    type: String, 
    content: String,
    isRead: { type: Boolean, default: false },
},{timestamps:true})

const Notification = model('Notification',notificationSchema)

export default Notification;