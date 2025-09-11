import express, { response } from "express";
import axios from "axios";
import { APP_CONFIG } from "./config/app.config";
import { MessageController } from "./controller/message.controller";
import { WebhookController } from "./controller/webhook.controller";


const app = express();
app.use(express.json());

const messageController = new MessageController();
const webhookcontroller = new WebhookController();

app.get("/webhook", webhookcontroller.webhook);
app.post("/send-message", messageController.sendMessage);
app.post("/webhook", webhookcontroller.webhookMessage);
app.get('/health', (req, res) => {
     res.send("Ok");
});
   

app.listen(8558, () => {
    console.log("Server is running on port 8558")
})
