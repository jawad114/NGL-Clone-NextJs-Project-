import mongoose,{Schema, Document, Model} from "mongoose";


export interface Message extends Document{
    content:string,
    createdAt:Date
}

const MessageSchema:Schema<Message>= new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})


export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isAcceptingMessage:boolean,
    isvarified:boolean
    messages:Message[]
}

const UserSchema:Schema<User>= new Schema({
    username:{
        type:String,
        require:[true, "username is required"],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        require:[true, "email is required"],
        unique:true,
        match:[/.+\@.+\..+/, "Please Provide a Valid email"]
    },
    password:{
        type:String,
        required:[true, "password is required"],
    },
    verifyCode:{
        type:String,
        required:[true, "verifyCode is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true, "verifyCodeExpiry is required"],
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    isvarified:{
        type:Boolean,
        default:false
    },
    messages:[MessageSchema]
 
})

const UserModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UserModel