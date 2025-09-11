import dotenv from "dotenv";

dotenv.config();
export const APP_CONFIG = {
    PHONE_NUMBER_ID:  process.env.PHONE_NUMBER_ID,
    VERSION: process.env.VERSION,
    WHATSAPP_USER_ACCESS_TOKEN: process.env.WHATSAPP_USER_ACCESS_TOKEN,
    PORT : 8558
}