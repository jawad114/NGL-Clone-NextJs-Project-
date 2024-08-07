import {resend} from '@/lib/resend';
import { EmailTemplate } from '../../emails/verificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(email:string,username:string,verifyCode:string):Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'col.jawadshahak47@gmail.com',
            to: email,
            subject: 'Hello world',
            react: EmailTemplate({username, otp:verifyCode}),
          });

        return{
            success:true,
            message:"Verification email send successfully"
        }
    } catch (error) {
        console.log("error sending verification email",error)
        return{
            success:false,
            message:"failed to send verification email"
        }
    }
}