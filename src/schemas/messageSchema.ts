import {z} from 'zod';

export const messageSchema=z.object({
   constent: z.string().min(10,{message:"Minimum you can enter 10 character"}).max(300, {message:"Not mmore then 300"})
})