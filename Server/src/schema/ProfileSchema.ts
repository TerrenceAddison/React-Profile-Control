import { z } from "zod";

export const createProfileSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Value must be a non-empty string"),
    age: z.number().int(),
    profile_pic: z.string(),
  })
});

export const updateProfileSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    name: z.string().nonempty("Value must be a non-empty string"),
    age: z.number().int(),
})
});