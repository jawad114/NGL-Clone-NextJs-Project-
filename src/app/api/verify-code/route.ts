import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function POST(request:Request){
    await dbConnect();
    try {
        const {username,code}=await request.json();
        const decodedUsername=decodeURIComponent(username);
             const user=await UserModel.findOne({username:decodedUsername});
             if(!user){
                return Response.json({
                    success:false,
                    message:"user not found"
                })
             }

             const isCodeValid=user.verifyCode ===code;
             const isCodeNotExpired=new Date(user.verifyCodeExpiry)> new Date()

             if(isCodeValid && isCodeNotExpired){
                user.isvarified=true
                await user.save()

                return Response.json({
                    success:true,
                    message:"Account varified successfully"
                })
             }else if(!isCodeNotExpired){
                 return Response.json({
                    success:false,
                    message:"Verification Code is Expired, Please signup again to get new code"
                 })
             }else{
                return Response.json({
                    success:false,
                    message:"incorrect Code"
                 })
             }
    } catch (error) {
        console.log("Eror varifying User");
        return Response.json({
            success:false,
            message:"Error varifying user"
        })
    }
}