import axios from "axios";
import { APP_CONFIG } from "../config/app.config";
import { Request, Response } from "express";

export class MessageController {

    sendMessage = async (req: Request, res: Response) => {
        const phoneNumber = req.body.phoneNumber;
        const message = req.body.message;
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

   await axios.request(config)
        .then((response: any) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error: any) => {
            console.log(error);
        });
    }
}