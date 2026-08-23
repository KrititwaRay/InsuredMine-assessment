import { getAgenda } from "../../../configuration/agends.js"

export class MessageService {
    constructor() { }

    scheduleMessageService = async (reqBody) => {
        try {
            const { message, day, time } = reqBody
            const scheduledAt = await convertToDate(day, time);

            const agenda = getAgenda();

            const job = agenda.create(
                "insert-message",
                {
                    message,
                    scheduledAt
                }
            );

            job.schedule(scheduledAt);

            await job.save();

            return global.Helpers.successFromService("Message scheduled successfully.", {
                date: day,
                time: time
            })

        } catch (error) {
            console.log(error)
            return global.Helpers.errorFromService("Something went wrong, please try again later.")
        }
    }
}


const convertToDate = async (day, time) => {
    const [timePart, period] = time.split(" ");
    let [hour, minute] = timePart.split(":").map(Number);

    if (period === "PM" && hour !== 12) {
        hour += 12;
    }

    if (period === "AM" && hour === 12) {
        hour = 0;
    }

    const scheduledAt = new Date(
        `${day}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`
    );

    return scheduledAt;


}