import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import ProfileRouter from "./router/ProfileRouter";
import WorkExperienceRouter from "./router/WorkExperienceRouter";

class App {
    public app: Application;
    constructor() {
        this.app = express();
        this.databaseSync();
        this.plugins();
        this.routes();
    }

    protected plugins():void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    protected databaseSync():void {
        const db = new Database();
        db.sequelize?.sync({force: true}); // remember to remove force: true
    }

    protected routes():void{
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("Hello World");
        });
        this.app.use("/api/v1/profile", ProfileRouter);
        this.app.use("/api/v1/work_experience", WorkExperienceRouter);
    }
}


const port:number = 8000;
const app = new App().app;

app.listen(port,()=> {
    console.log(`Server is running on port ${port}`);
})