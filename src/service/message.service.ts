import axios from "axios";
import { APP_CONFIG } from "../config/app.config";

export class MessageService {

    private static instance: MessageService;

    public static getInstance(): MessageService {
        if (!MessageService.instance) {
            MessageService.instance = new MessageService();
        }   
        return MessageService.instance;
    }
    private constructor() {

    }

    public async sendMessage(phoneNumber: string, message: string)
     {
        let data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": `${phoneNumber}`,
        "type": "text",
        "text": {
            "preview_url": false,
            "body": message
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://graph.facebook.com/${APP_CONFIG.VERSION}/${APP_CONFIG.PHONE_NUMBER_ID}/messages`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${APP_CONFIG.WHATSAPP_USER_ACCESS_TOKEN}`
        },
        data: data
    };

    try{

         const response = await axios.request(config)
         if(response.status === 200){
            console.log('reply sent to ' ,phoneNumber);
             return true;
         }

   }catch(error){
            console.log(error);
            
    }

    return false;
 }
}