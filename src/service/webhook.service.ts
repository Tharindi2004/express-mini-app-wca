import { Request, Response } from "express";  
import { webhookMessageDto, WebhookVerificationDto, WebhookVerificationResponseDto } from "../dto/webhookVerification.dto";
import { APP_CONFIG } from "../config/app.config";
import { MessageService } from "./message.service";
 import { GeminiService } from "./gemini.service";
 
export class WebhookService {

    private static instance: WebhookService;
    private messageService: MessageService;
    private geminiService: GeminiService;

    public static getInstance(): WebhookService {
        if (!WebhookService.instance) {
            WebhookService.instance = new WebhookService();
        }

        return WebhookService.instance;
    }

    private constructor() {
        this.messageService = MessageService.getInstance();
        this.geminiService = GeminiService.getInstance();


    }

    public handleWebhookVerification(data: WebhookVerificationDto):WebhookVerificationResponseDto{
        const password = APP_CONFIG.WEBHOOK_VERIFICATION_PASSWORD;

        if(data.mode === 'subscribe' && data.verify_token === password){
            return {
                status: true,
                challenge: data.challenge
            };
        }

        // Default response if condition is not met
        return {
           status: false,
           challenge: data.challenge
        };

        return {
            status: false,
            challenge: ''
         };
    }

    public async handleReceiveMessage(data: webhookMessageDto):Promise<boolean>{

        
        const status = data.entry[0].changes[0].value.statuses;
        console.log(JSON.stringify(status));
        if(status !== undefined && status.length>0){
            console.log('status: ', status[0].status);
            return true;
        }

        try{

            const message = data.entry[0].changes[0].value.messages[0].text?.body;
            if(message === undefined){
                console.log('message is undefined');
                console.log(JSON.stringify(data));
                return true;
            }
       
             
             const phoneNumber = data.entry[0].changes[0].value.contacts[0].wa_id;
             const name = data.entry[0].changes[0].value.contacts[0].profile.name;


        //const replyMessage = `Hello ${name}, Your Message Received`;

             const replyMessage = await this.geminiService.generateReply(message);

             const isReplied = await this.messageService.sendMessage(phoneNumber, replyMessage);
             
        
             

                if(isReplied){
                return true;
            }
        }
         catch(error:any){
            console.log(error.message);
            return true;
         }
        
         return false;
    }
}

    

//singleton pattern ekak use krl hdpu clz ekakin object ekk hadenne
//system eke life time ektma eka paarai