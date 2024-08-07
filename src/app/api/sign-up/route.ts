import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs'

export async function POST(request:Request){
    await dbConnect();

    try {
        const {email, password, username}=await request.json()
       const existingUserVerifiedByUsername= await UserModel.findOne({username,
            isvarified:true
        })

        if(existingUserVerifiedByUsername){
                return Response.json({
                    success:false,
                    message:"Username is already taken"
                },{
                    status:400
                })
        }

        const existingUserByEmail=await UserModel.findOne({email})
        const verifyCode= Math.floor(100000 + Math.random()*900000).toString()

        if(existingUserByEmail){
            if(existingUserByEmail.isvarified){
                return Response.json({
                    success:false,
                    message:"User already exist with this email"
                })
            }
            else{
                const hashedPassword=await bcrypt.hash(password,10);
                existingUserByEmail.password=hashedPassword;
                existingUserByEmail.verifyCode=verifyCode;
                existingUserByEmail.verifyCodeExpiry=new Date(Date.now()+3600000)
                await existingUserByEmail.save()
            }
        }else{
            const hashedPassword=await bcrypt.hash(password,10);
            const expiryDate=new Date();
            expiryDate.setHours(expiryDate.getHours()+1)
           const newUser= new UserModel({
                username,
                email,
                hashedPassword,
                verifyCode,
                verifyCodeExpiry:expiryDate,
                isAcceptingMessage:true,
                isvarified:false,
                messages:[]
            })

            await newUser.save()

            const emailResponse= await sendVerificationEmail(
                email,
                username,
                verifyCode
            )
            if(!emailResponse.success){
                return Response.json({
                    success:false,
                    message:emailResponse.message
                })
            }
             
            return Response.json({
                success:true,
                message:"user registerd successfully verify the email now "
            })
        }

       

      
    } catch (error) {
        console.log("error registering user",error);
        return Response.json({
            success:false,
            message:"Error while registering user"
        },{
            status:500
        })
    }
}