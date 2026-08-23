import mongoose from "mongoose";
import { initializeAgenda } from "./agends.js";
import registerMessageJob from "../domain/message/jobs/message.job.js"

const connectDb = async () => {
    try {
        const url = process.env.DB_URL;

        if (!url) {
            throw new Error(`MONGO URI is not defined in enviroment variables.`)
        }


        await mongoose.connect(url, {
            dbName: "InsuredMine-Assessment"
        })
        const agenda = await initializeAgenda();

        registerMessageJob(agenda);
        console.log(`Database connected successfully!`)
    } catch (error) {
        console.error(`Failed to connect to Mongodb. `, error);
        
    }
}



export default connectDb;
