import {z} from 'zod';

export const signUpSchema=z.object({
    username: z.string().min(2,{message:"username should be greater then 2 chars"}).max(20,{message:"username should not be greater then 20"}),
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().min(6,{message:"password should be greater then 6 characters"})
})