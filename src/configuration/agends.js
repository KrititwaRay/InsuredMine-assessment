import mongoose from "mongoose";
import { Agenda } from "agenda";
import { MongoBackend } from "@agendajs/mongo-backend";

let agenda = null;

const initializeAgenda = async () => {
    agenda = new Agenda({
        backend: new MongoBackend({
            address: process.env.DB_URL,
            collection: "agendaJobs"

        }),
        processEvery: "5 seconds",

        maxConcurrency: 10,

        defaultConcurrency: 5
    })

    agenda.on("error", (error) => {
        console.error("Agenda error:", error);
    });
    
    await agenda.start();
    console.log("Agenda started");
    return agenda;
}

const getAgenda = () => {

    if (!agenda) {
        throw new Error("Agenda has not been initialized");
    }

    return agenda;
};


export {
    initializeAgenda,
    getAgenda
};