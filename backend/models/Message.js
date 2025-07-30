import mongoose from "mongoose";

const {Schema,model}= mongoose;
const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    timestamp: { type: Date, default: Date.now }
    });

const Message = model('Message',messageSchema)
export default Message;