import Message from "../model/message.model.js";

const registerMessageJob = (agenda) => {
    agenda.define('insert-message', async (job) => {
        try {
            const { message, scheduledAt } = job.attrs.data;
            await Message.create({
                message,
                scheduledAt
            });
            console.log(
                `Message inserted successfully: ${message}`
            );
        } catch (error) {
            console.error(
                "Failed to insert message:",
                error
            );
            throw error;
        }
    })
}

export default registerMessageJob;