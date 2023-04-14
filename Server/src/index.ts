import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import ProfileRouter from "./router/ProfileRouter";
import WorkExperienceRouter from "./router/WorkExperienceRouter";
import cors from "cors";

class App {
    public app: Application;
    constructor() {
        this.app = express();
        this.databaseSync();
        this.plugins();
        this.routes();
    }

    protected plugins():void{
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(express.urlencoded({limit: '50mb', extended: true}));
        this.app.use(cors());
    }

    protected databaseSync():void {
        const db = new Database();
        // db.sequelize?.sync({force: true}); // remember to remove force: true
        db.sequelize?.sync();
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