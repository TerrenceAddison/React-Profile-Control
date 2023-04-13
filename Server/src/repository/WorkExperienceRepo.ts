import { WorkExperience } from "../Model/WorkExperience";

interface IWorkExperienceRepo{
    save(workExperience: WorkExperience): Promise<void>;
    update(workExperience: WorkExperience): Promise<void>;
    delete(id: number): Promise<void>;
    retrieveById(id: number): Promise<WorkExperience>;
    retrieveByUserId(userId: number): Promise<WorkExperience[]>;
    retrieveAll(): Promise<WorkExperience[]>;
}

export class WorkExperienceRepo implements IWorkExperienceRepo {
    async save(workExperience: WorkExperience): Promise<void> {
        try{
            await WorkExperience.create({
                    user_id: workExperience.user_id,
                    start_date: workExperience.start_date,
                    end_date: workExperience.end_date,
                    job_title: workExperience.job_title,
                    company: workExperience.company,
                    company_logo: workExperience.company_logo,
                    description: workExperience.description
                });
        }catch(err){
            throw err;
        }
    }
    async update(workExperience: WorkExperience): Promise<void> {
        try{
            const new_workExperience = await WorkExperience.findOne({
                where: {
                    id: workExperience.id
                }
            });

            if(!new_workExperience) throw new Error("Work Experience not found");

            new_workExperience.start_date = workExperience.start_date;
            new_workExperience.end_date = workExperience.end_date;
            new_workExperience.job_title = workExperience.job_title;
            new_workExperience.company = workExperience.company;
            new_workExperience.company_logo = workExperience.company_logo;
            new_workExperience.description = workExperience.description;

            await new_workExperience.save();
        }catch(err){
            throw err;
        }
    }
    async delete(id: number): Promise<void> {
        try{
            const new_workExperience = await WorkExperience.findOne({
                where: {
                    id: id
                }
            });

            if(!new_workExperience) throw new Error("Work Experience not found");

            await new_workExperience.destroy();
        }catch(err){
            throw err;
        }
    }
    async retrieveById(id: number): Promise<WorkExperience> {
        try{
            const new_workExperience = await WorkExperience.findOne({
                where: {
                    id: id
                }
            });

            if(!new_workExperience) throw new Error("Work Experience not found");

            return new_workExperience;
        }catch(err){
            throw err;
        }
    }
    async retrieveByUserId(userId: number): Promise<WorkExperience[]> {
        try{
            return await WorkExperience.findAll({
                where: {
                    id: userId
                }
            });
        }catch(err){
            throw err;
        }
    }
    async retrieveAll(): Promise<WorkExperience[]> {
        try{
            return await WorkExperience.findAll();
        }catch(err){
            throw err;
        }
    }
}