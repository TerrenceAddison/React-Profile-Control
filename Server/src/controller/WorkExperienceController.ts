import {Request, Response} from "express";
import { WorkExperience } from "../Model/WorkExperience";
import { WorkExperienceRepo } from "../repository/WorkExperienceRepo";

class WorkExperienceController {
    async create(req: Request, res: Response)
    {
        try{
            const new_workExperience = new WorkExperience();
            new_workExperience.user_id = req.body.userId;
            new_workExperience.start_date = req.body.startDate;
            new_workExperience.end_date = req.body.endDate;
            new_workExperience.job_title = req.body.jobTitle;
            new_workExperience.company = req.body.company;
            new_workExperience.company_logo = req.body.companyLogo;
            new_workExperience.description = req.body.jobDescription;

            await new WorkExperienceRepo().save(new_workExperience);
            res.status(201).json({
                status: "Created",
                message: "Successfully Created WorkExperience"
            })

        } catch(err)
        {
            res.status(500).json({
                status: "Internal Server Error",
                message: err,
            });
        }
    }
    async update(req: Request, res: Response) {
        try {
          let id = parseInt(req.params["id"]);
          const new_workExperience = new WorkExperience();
    
          new_workExperience.id = id;
          new_workExperience.user_id = req.body.userId;
          new_workExperience.start_date = req.body.startDate;
          new_workExperience.end_date = req.body.endDate;
          new_workExperience.job_title = req.body.jobTitle;
          new_workExperience.company = req.body.company;
          new_workExperience.company_logo = req.body.companyLogo;
          new_workExperience.description = req.body.jobDescription;
    
          await new WorkExperienceRepo().update(new_workExperience);
    
          res.status(200).json({
            status: "Ok!",
            message: "Successfully updated Work Experience data!",
          });
        } catch (err) {
          res.status(500).json({
            status: "Internal Server Error!",
            message: "Internal Server Error!",
          });
        }
      }


    async delete(req: Request, res: Response){
        try {
            let id = parseInt(req.params["id"]);
            await new WorkExperienceRepo().delete(id);
      
            res.status(200).json({
              status: "Ok!",
              message: "Successfully deleted work experience!",
            });
          } catch (err) {
            res.status(500).json({
              status: "Internal Server Error!",
              message: "Internal Server Error!",
            });
          }
    }

    async findById(req: Request, res: Response) {
        try {
          let id = parseInt(req.params["id"]);
          const new_workExperience = await new WorkExperienceRepo().retrieveById(id);
    
          res.status(200).json({
            status: "Ok!",
            message: "Successfully fetched work experience by id!",
            data: new_workExperience,
          });
        } catch (err) {
          res.status(500).json({
            status: "Internal Server Error!",
            message: "Internal Server Error!",
          });
        }
    }
    async findByUserId(req: Request, res: Response) {
        try {
            let user_id = parseInt(req.params["userId"]);
          const workExperiences = await new WorkExperienceRepo().retrieveByUserId(user_id);
    
          res.status(200).json({
            status: "Ok!",
            message: "Successfully fetched all Work Experience data!",
            data: workExperiences,
          });
        } catch (err) {
          res.status(500).json({
            status: "Internal Server Error!",
            message: "Internal Server Error!",
          });
        }
    }  
    async findAll(req: Request, res: Response) {
        try {
          const workExperiences = await new WorkExperienceRepo().retrieveAll();
    
          res.status(200).json({
            status: "Ok!",
            message: "Successfully fetched all Work Experience data!",
            data: workExperiences,
          });
        } catch (err) {
          res.status(500).json({
            status: "Internal Server Error!",
            message: "Internal Server Error!",
          });
        }
    }
}

export default new WorkExperienceController();