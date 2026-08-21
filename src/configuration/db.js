import mongoose from "mongoose";


const connectDb = async () => {
    try {
        const url = process.env.DB_URL;

        if (!url) {
            throw new Error(`MONGO URI is not defined in enviroment variables.`)
        }


        await mongoose.connect(url, {
            dbName: "InsuredMine-Assessment"
        })
        console.log(`Database connected successfully!`)
    } catch (error) {
        console.error(`Failed to connect to Mongodb. `, error);
        
    }
}



export default connectDb;
