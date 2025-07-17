import mongoose from "mongoose";


export async function connectToDB(){
    const MONGO_URI  = process.env.MONGO_URI;
    console.log(MONGO_URI)
    try{
        const connect = await mongoose.connect(`${process.env.MONGO_URI}`);
        if(connect){
            console.log("DB connected successfully")
        }
    }
    catch(e){
        console.log("some error occurred",e);
    }
    

}