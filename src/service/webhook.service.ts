import { Request, Response } from "express";  
import { webhookMessageDto, WebhookVerificationDto, WebhookVerificationResponseDto } from "../dto/webhookVerification.dto";
import { APP_CONFIG } from "../config/app.config";
import { MessageService } from "./message.service";
export class WebhookService {

    private static instance: WebhookService;
    private messageService: MessageService;

    public static getInstance(): WebhookService {
        if (!WebhookService.instance) {
            WebhookService.instance = new WebhookService();
        }

        return WebhookService.instance;
    }

    private constructor() {
        this.messageService = MessageService.getInstance();


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

    public async handleWebhookMessage(data: webhookMessageDto):Promise<boolean>{
          const message = data.entry[0].changes[0].value.messages[0].text.body;
        const phoneNumber = data.entry[0].changes[0].value.contacts[0].wa_id;
        const type = data.entry[0].changes[0].value.messages[0].type;
        const name = data.entry[0].changes[0].value.contacts[0].profile.name;

        const replyMessage = `Hello ${name}, we have received your message`;
        const isReplied = await this.messageService.sendMessage(phoneNumber, replyMessage);

        if(isReplied){
            return true;
        }

        return false;
    }
        }


//singleton pattern ekak use krl hdpu clz ekakin object ekk hadenne
//system eke life time ektma eka paarai