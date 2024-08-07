import mongoose from "mongoose";

type ConnectionObjec={
    isConnected?:number
}

const connection:ConnectionObjec={

}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Already Connected");
        return
    }

    try {
        const db=await mongoose.connect(process.env.MONGODB_URI || '',{})
        connection.isConnected=db.connections[0].readyState;

        console.log("db Connected successfully");
    } catch (error) {
        console.log("Db connection failed",error);
        process.exit();
    }
}


export default dbConnect;