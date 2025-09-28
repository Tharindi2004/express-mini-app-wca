import { Router } from "express";
import { MessageController } from "../controller/message.controller";

//message
export class MessageRouter {
    private router: Router;
    private static instance: MessageRouter;
    private messageController: MessageController;
    public static getInstance(): MessageRouter {
        if(!MessageRouter.instance){
            MessageRouter.instance = new MessageRouter();
        }
        return MessageRouter.instance;
    }

    private constructor() {
        this.router = Router();
        this.messageController = new MessageController();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post("/", this.messageController.sendMessage);
    }

    public getRouter(): Router {
        return this.router;
    }
}