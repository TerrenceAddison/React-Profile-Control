import {Request, Response} from "express";
import { Profile } from "../Model/Profile";
import { ProfileRepo } from "../repository/ProfileRepo";
import {workExperienceConverterToDB , workExperienceConverterToUI } from "../helper/workExperienceConverter";

class ProfileController {
    async create(req: Request, res: Response)
    {
        try{
            const new_profile = new Profile();
            new_profile.name = req.body.name;
            new_profile.age = req.body.age;
            new_profile.profile_pic = req.body.profilePic;

            const workExperiences = req.body.workExperiences;
            new_profile.work_experiences = workExperienceConverterToDB(workExperiences);

            const newId = await new ProfileRepo().save(new_profile);
            res.status(201).json({
                status: "Created",
                message: "Successfully Created Profile",
                id: newId
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
          const new_profile = new Profile();
          new_profile.id = id;
          new_profile.name = req.body.name;
          new_profile.age = req.body.age;
          new_profile.profile_pic = req.body.profilePic;

          const workExperiences = req.body.workExperiences;
          new_profile.work_experiences = workExperienceConverterToDB(workExperiences);

    
          await new ProfileRepo().update(new_profile);
    
          res.status(200).json({
            status: "Ok!",
            message: "Successfully updated Profile data!",
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
            await new ProfileRepo().delete(id);
      
            res.status(200).json({
              status: "Ok!",
              message: "Successfully deleted profile!",
            });
          } catch (err) {
            res.status(500).json({
              status: "Internal Server Error!",
              message: "Failed to delete profile",
            });
          }
    }

    async findById(req: Request, res: Response) {
        try {
          let id = parseInt(req.params["id"]);
          const new_profile = await new ProfileRepo().retrieveById(id);
    
          res.status(200).json({
            status: "Ok!",
            message: "Successfully fetched profile by id!",
            data: new_profile,
          });
        } catch (err) {
          res.status(500).json({
            status: "Internal Server Error!",
            message: "Profile not found",
          });
        }
    }
 
    async findAll(req: Request, res: Response) {
        try {
          const profiles = await new ProfileRepo().retrieveAll();
          const translatedProfiles = profiles.map((profile:{
            id: number;
            name: string;
            age: number;
            profile_pic: string;
            work_experiences: any;
          }) => {
            return {
              id: profile.id,
              name: profile.name,
              age: profile.age,
              profilePic: profile.profile_pic,
              workExperiences: workExperienceConverterToUI(profile.work_experiences),
            };
          });
          res.status(200).json({
            status: "Ok!",
            message: "Successfully fetched all Profile data!",
            data: translatedProfiles,
          });
        } catch (err) {
          res.status(500).json({
            status: "Internal Server Error!",
            message: "Internal Server Error!",
          });
        }
    }
}

export default new ProfileController();