import { Router } from "express";
import { UserController } from "../controller/user.controller";

//user
export class UserRouter {
    private router: Router;
    private static instance: UserRouter;
    private userController: UserController;
    public static getInstance(): UserRouter {
        if(!UserRouter.instance){
            UserRouter.instance = new UserRouter();
        }
        return UserRouter.instance;
    }

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post("/", this.userController.createUser);
    }


    public getRouter(): Router {
        return this.router;
    }
}