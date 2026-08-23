import { check } from "express-validator";

export class MessageMiddleware {
    scheduleMessageRule() {
        return [
            check('message').trim().notEmpty().withMessage("Message is required."),
            //YYYY-MM-DD
            check("day").trim().notEmpty().withMessage("Day is required.").matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("Day must be in YYYY-MM-DD format.") .custom((value, { req }) => {

                    const [year, month, day] = value.split("-").map(Number);

                    // check valid calendar date
                    const inputDate = new Date(year, month - 1, day);

                    if (
                        inputDate.getFullYear() !== year ||
                        inputDate.getMonth() !== month - 1 ||
                        inputDate.getDate() !== day
                    ) {
                        throw new Error("Invalid date.");
                    }

                    // today's date
                    const today = new Date();

                    const todayDate = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate()
                    );

                    // remove time from input date
                    const selectedDate = new Date(
                        year,
                        month - 1,
                        day
                    );

                    // date cannot be before today
                    if (selectedDate < todayDate) {
                        throw new Error("Day cannot be before today's date.");
                    }

                    return true;
                }),
            //hh:mm AM/PM
            check("time").trim().notEmpty().withMessage("Time is required.").matches(/^(0[1-9]|1[0-2]):[0-5]\d (AM|PM)$/).withMessage("Time must be in hh:mm AM/PM format.").custom((value, { req }) => {

                    const [hourMinute, period] = value.split(" ");
                    const [hour, minute] = hourMinute
                        .split(":")
                        .map(Number);

                    // convert 12-hour time to 24-hour time
                    let hour24 = hour;

                    if (period === "AM" && hour === 12) {
                        hour24 = 0;
                    }

                    if (period === "PM" && hour !== 12) {
                        hour24 = hour + 12;
                    }

                    // get today's date
                    const now = new Date();

                    // get selected date
                    const [year, month, day] = req.body.day
                        .split("-")
                        .map(Number);

                    const selectedDate = new Date(
                        year,
                        month - 1,
                        day
                    );

                    const todayDate = new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate()
                    );

                    // only compare time if selected date is today
                    if (selectedDate.getTime() === todayDate.getTime()) {

                        const currentMinutes =
                            now.getHours() * 60 + now.getMinutes();

                        const selectedMinutes =
                            hour24 * 60 + minute;

                        if (selectedMinutes < currentMinutes) {
                            throw new Error(
                                "Time cannot be before the current time."
                            );
                        }
                    }

                    return true;
                }),


        ]
    }
}

