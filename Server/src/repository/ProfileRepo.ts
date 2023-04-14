import { Profile } from "../Model/Profile";
import { WorkExperience } from "../Model/WorkExperience";


interface IProfileRepo{
    save(profile: Profile): Promise<number>;
    update(profile: Profile): Promise<void>;
    delete(id: number): Promise<void>;
    retrieveById(id: number): Promise<Profile>;
    retrieveAll(): Promise<Profile[]>;
}

export class ProfileRepo implements IProfileRepo {
    async save(profile: Profile): Promise<number> {
        try{
            console.log("profile repo");
            const createdProfile = await Profile.create({
                    name: profile.name,
                    age: profile.age,
                    profile_pic: profile.profile_pic
                });
            console.log("profile done");
            if(profile.work_experiences.length > 0)
            {
                console.log("work exp start");
                for (const workExp of profile.work_experiences) {
                    console.log(workExp);
                    await WorkExperience.create({
                        user_id: createdProfile.id,
                        start_date: workExp.start_date,
                        end_date: workExp.end_date,
                        job_title: workExp.job_title,
                        company: workExp.company,
                        company_logo: workExp.company_logo,
                        description: workExp.description
                    });
                }
            }
            
            return createdProfile.id;
        }catch(err){
            console.log("profile repo error");
            console.log(err);
            throw err;
        }
    }
    async update(profile: Profile): Promise<void> {
        try{
            console.log("repo update start");
            const new_profile = await Profile.findOne({
                where: {
                    id: profile.id
                }
            });
            
            console.log("repo got new_profile");
            if(!new_profile) throw new Error("Profile not found");

            new_profile.name = profile.name;
            new_profile.age = profile.age;
            new_profile.profile_pic = profile.profile_pic;
            await new_profile.save();

            console.log("new profile saved");
            await WorkExperience.findAll({
                where: {
                    user_id: profile.id
                }
            }).then(async (workExps) => {
                console.log("await done");
                console.log(workExps);
                if(workExps.length === 0) return;
                console.log("did not return");
                console.log(profile.work_experiences);
                console.log(workExps);
                const notFoundWorkExperience = workExps.filter((workExp) => {
                    return !profile.work_experiences.find((new_workExp) => {
                        return new_workExp.id === workExp.id;
                    });
                });
                for(const workExp of notFoundWorkExperience){
                    console.log("destroy triggered");
                    await workExp.destroy();
                }
            });
            for (const workExp of profile.work_experiences) {
                if (workExp.id === undefined)
                {
                    console.log("work exp undefined");
                    await WorkExperience.create({
                        user_id: profile.id,
                        start_date: workExp.start_date,
                        end_date: workExp.end_date,
                        job_title: workExp.job_title,
                        company: workExp.company,
                        company_logo: workExp.company_logo,
                        description: workExp.description
                    });
                }
                else{
                    console.log("update work exp");
                    const new_workExp = await WorkExperience.findOne({
                        where: {
                            id: workExp.id
                        }
                    });
                    if(new_workExp === null) throw new Error("Work Experience not found");
                    new_workExp.start_date = workExp.start_date;
                    new_workExp.end_date = workExp.end_date;
                    new_workExp.job_title = workExp.job_title;
                    new_workExp.company = workExp.company;
                    new_workExp.company_logo = workExp.company_logo;
                    new_workExp.description = workExp.description;
                    await new_workExp.save();
                }

            }
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    async delete(id: number): Promise<void> {
        try{
            const new_profile = await Profile.findOne({
                where: {
                    id: id
                }
            });

            if(!new_profile) throw new Error("Profile not found");

            await new_profile.destroy();
        }catch(err){
            throw err;
        }
    }
    async retrieveById(id: number): Promise<Profile> {
        try{
            const new_profile = await Profile.findOne({
                where: {
                    id: id
                },
                include: WorkExperience
            });
            

            if(!new_profile) throw new Error("Profile not found");

            return new_profile;
        }catch(err){
            throw err;
        }
    }
    async retrieveAll(): Promise<Profile[]> {
        try{
            return await Profile.findAll({
                include: WorkExperience
            });
        }catch(err){
            throw err;
        }
    }
}