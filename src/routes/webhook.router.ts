import { Router } from "express";
import { WebhookController } from "../controller/webhook.controller";

export class WebhookRouter {
    private router: Router;

    private static instance: WebhookRouter;
    private webhookController: WebhookController;
    public static getInstance(): WebhookRouter {
        if(!WebhookRouter.instance){
            WebhookRouter.instance = new WebhookRouter();
        }
        return WebhookRouter.instance;
    }

    private constructor() {
        this.router = Router();
        this.webhookController = new WebhookController();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get("/", this.webhookController.webhook);
        this.router.post("/", this.webhookController.webhookMessage);
    }

    public getRouter(): Router {
        return this.router;
    }
}