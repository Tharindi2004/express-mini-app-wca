
import { Request, Response } from "express";
import { WebhookService } from "../service/webhook.service";
import { webhookMessageDto, WebhookVerificationDto } from "../dto/webhookVerification.dto";

export class WebhookController {

    private webhookService: WebhookService;

    constructor() { 
        this.webhookService = WebhookService.getInstance();
    }
  
   webhook = async (req: Request, res: Response) => {
       
        console.log(JSON.stringify(req.query));
        const mood = req.query['hub.mode'] as string;
        const challenge = req.query['hub.challenge'] as string;
        let verify_token = req.query['hub.verify_token'] as string;
        console.log(mood, challenge, verify_token);
        if(mood === 'subscribe' && verify_token === '1234567890'){
                res.send(challenge);
                return;
        }
        
        const mode = req.query['hub.mode'] as string;
        // let verify_token = req.query['hub.verify_token'] as string; // Removed redeclaration

        const data: WebhookVerificationDto = {
            mode,
            challenge,
            verify_token,
            mood: mood,
            entry: [] // Provide an empty array or actual entry data as required by your logic
        }
        const response = this.webhookService.handleWebhookVerification(data);
        if(response.status){
            res.send(response.challenge);
            return;
        }


        res.send('Error, wrong token');
    }

    webhookMessage = async (req: Request, res: Response) => {
       //cnsole.log(JSON.stringify(req.body));
        const data = req.body as webhookMessageDto;

        const message = data.entry[0].changes[0].value.messages[0].text.body;
        const phoneNumber = data.entry[0].changes[0].value.contacts[0].wa_id;
        const type = data.entry[0].changes[0].value.messages[0].type;
        const name = data.entry[0].changes[0].value.contacts[0].profile.name;
        console.log('===================================');
        console.log(phoneNumber +" : "+message+" : "+type+" : "+name);
        console.log(JSON.stringify(data.entry[0].changes[0].value.statuses));
        console.log(JSON.stringify(data.entry[0].changes[0].value.errors));
        console.log(JSON.stringify(data.entry[0].changes[0].value.contacts));
        console.log(JSON.stringify(data.entry[0].changes[0].value.metadata));
        console.log('===================================');

       const isReplied = await this.webhookService.handleWebhookMessage(data);

        if(isReplied){
            res.status(200).send('OK');

        }else{
            res.status(500).send('Error');
        }

    
    }


}
