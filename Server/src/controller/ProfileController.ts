import {Request, Response} from "express";
import { Profile } from "../Model/Profile";
import { ProfileRepo } from "../repository/ProfileRepo";

class ProfileController {
    async create(req: Request, res: Response)
    {
        try{
          console.log("create");
          console.log(req.body);
            const new_profile = new Profile();
            new_profile.name = req.body.name;
            new_profile.age = req.body.age;
            new_profile.profile_pic = req.body.profile_pic;

            await new ProfileRepo().save(new_profile);
            res.status(201).json({
                status: "Created",
                message: "Successfully Created Profile"
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
          new_profile.profile_pic = req.body.profile_pic;

    
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
          const new_profile = await new ProfileRepo().retrieveById(id);
    
          res.status(200).json({
            status: "Ok!",
            message: "Successfully fetched work experience by id!",
            data: new_profile,
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
          const profiles = await new ProfileRepo().retrieveAll();
    
          res.status(200).json({
            status: "Ok!",
            message: "Successfully fetched all Profile data!",
            data: profiles,
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