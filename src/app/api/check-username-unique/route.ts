import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from 'zod';
import { signUpSchema } from "@/schemas/signUpSchema";

// Define the schema for the username query
const UsernameQuerySchema = z.object({
    username: signUpSchema.shape.username,
});

// Define the GET request handler
export async function GET(request: Request) {
    await dbConnect();
    try {
        // Create a new URL object from the request URL
        const url = new URL(request.url);
        // Extract the search parameters from the URL
        const searchParams = new URLSearchParams(url.search);
        
        // Get the 'username' parameter from the search parameters
        const queryParam = {
            username: searchParams.get('username') || '', // Use empty string as a fallback
        };

        // Validate the query parameters against the schema
        const result = UsernameQuerySchema.safeParse(queryParam);
        console.log(result);

        if (!result.success) {
            const usernameError = result.error.format().username?._errors || [];
            return new Response(JSON.stringify({
                success: false,
                message: usernameError.length > 0 ? usernameError.join(', ') : "Invalid query parameters",
            }), { status: 400 });
        }

        const { username } = result.data;
        const existingVarifiedUser = await UserModel.findOne({ username, isvarified: true });
        
        if (existingVarifiedUser) {
            return new Response(JSON.stringify({
                success: false,
                message: "Username is already taken",
            }), { status: 409 });
        } else {
            return new Response(JSON.stringify({
                success: true,
                message: "Username is unique",
            }), { status: 200 });
        }
    } catch (error) {
        console.log("Error Checking Username", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error Checking username",
        }), { status: 500 });
    }
}
