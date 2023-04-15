import { z } from "zod";


export const workExperienceSchema = z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullable(),
    jobTitle: z.string().nonempty("Value must be a non-empty string"),
    company: z.string().nonempty("Value must be a non-empty string"),
    jobDescription: z.string().nonempty("Value must be a non-empty string"),
    companyLogo: z.string().nonempty("Value must be a non-empty string"),
}).refine((data) => {
  if (data.endDate === null) {
    return true;
  } else {
    return data.startDate < data.endDate;
  }
}, { message: "Start date must be less than end date!" });

export const createWorkExperienceSchema = z.object({
  body: z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullable(),
    jobTitle: z.string().nonempty("Value must be a non-empty string"),
    company: z.string().nonempty("Value must be a non-empty string"),
    jobDescription: z.string().nonempty("Value must be a non-empty string"),
    companyLogo: z.string().nonempty("Value must be a non-empty string"),
  })
  .refine((data) => {
    if (data.endDate === null) {
      return true;
    } else {
      return data.startDate < data.endDate;
    }
  }, { message: "Start date must be less than end date!" })
});

export const updateWorkExperienceSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullable(),
    jobTitle: z.string().nonempty("Value must be a non-empty string"),
    company: z.string().nonempty("Value must be a non-empty string"),
    jobDescription: z.string().nonempty("Value must be a non-empty string"),
    companyLogo: z.string().nonempty("Value must be a non-empty string"),
  })
  .refine((data) => {
    if (data.endDate === null) {
      return true;
    } else {
      return data.startDate < data.endDate;
    }
  }, { message: "Start date must be less than end date!" })
});