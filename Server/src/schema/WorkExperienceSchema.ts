import { z } from "zod";

export const createWorkExperienceSchema = z.object({
  body: z.object({
    user_id: z.number().int(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    job_title: z.string().nonempty("Value must be a non-empty string"),
    company: z.string().nonempty("Value must be a non-empty string"),
  })
    .refine((data) => data.start_date < data.end_date, {
        message: "Start date must be less than end date!",
    })
});

export const updateWorkExperienceSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    user_id: z.number().int(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    job_title: z.string().nonempty("Value must be a non-empty string"),
    company: z.string().nonempty("Value must be a non-empty string"),
  })
    .refine((data) => data.start_date < data.end_date, {
        message: "Start date must be less than end date!",
    })
});