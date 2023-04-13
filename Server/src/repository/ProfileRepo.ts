import { Profile } from "../Model/Profile";


interface IProfileRepo{
    save(profile: Profile): Promise<void>;
    update(profile: Profile): Promise<void>;
    delete(id: number): Promise<void>;
    retrieveById(id: number): Promise<Profile>;
    retrieveAll(): Promise<Profile[]>;
}

export class ProfileRepo implements IProfileRepo {
    async save(profile: Profile): Promise<void> {
        try{
            await Profile.create({
                    name: profile.name,
                    age: profile.age,
                    profile_pic: profile.profile_pic
                });
        }catch(err){
            throw err;
        }
    }
    async update(profile: Profile): Promise<void> {
        try{
            const new_profile = await Profile.findOne({
                where: {
                    id: profile.id
                }
            });

            if(!new_profile) throw new Error("Profile not found");

            new_profile.name = profile.name;
            new_profile.age = profile.age;
            new_profile.profile_pic = profile.profile_pic;
            await new_profile.save();
        }catch(err){
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
                }
            });

            if(!new_profile) throw new Error("Profile not found");

            return new_profile;
        }catch(err){
            throw err;
        }
    }
    async retrieveAll(): Promise<Profile[]> {
        try{
            return await Profile.findAll();
        }catch(err){
            throw err;
        }
    }
}