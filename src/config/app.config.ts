import dotenv from "dotenv";

dotenv.config();
export const APP_CONFIG = {
    PHONE_NUMBER_ID:  process.env.PHONE_NUMBER_ID,
    VERSION: process.env.VERSION,
    WHATSAPP_USER_ACCESS_TOKEN: process.env.WHATSAPP_USER_ACCESS_TOKEN,
    PORT : 8558,
    WEBHOOK_VERIFICATION_PASSWORD : process.env.WEBHOOK_VERIFICATION_PASSWORD,
    OPEN_AI_KEY : process.env.OPEN_AI_KEY,
    GEMINI_API_KEY : process.env.GEMINI_API_KEY,
    MONGO_URI: process.env.MONGO_URI || '',
}   