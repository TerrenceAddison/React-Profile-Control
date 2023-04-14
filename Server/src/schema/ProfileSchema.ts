import { z } from "zod";
import { workExperienceSchema } from "./WorkExperienceSchema";
export const createProfileSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Value must be a non-empty string"),
    age: z.number().int(),
    profilePic: z.string(),
    workExperiences: z.array(workExperienceSchema),
  })
});

export const updateProfileSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    name: z.string().nonempty("Value must be a non-empty string"),
    age: z.number().int(),
    profilePic: z.string(),
    workExperiences: z.array(workExperienceSchema),
})
});