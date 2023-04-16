import { AnyZodObject } from "zod";
import validate from "../../../src/helper/validate";
import { Request, Response } from "express";
import { createProfileSchema } from "../../../src/schema/ProfileSchema";

describe("validate middleware", () => {
  const schema: AnyZodObject = createProfileSchema;
  let req: Request;
  let res: Response;
  let next: jest.Mock;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    next = jest.fn();
  });

  it("should call next when schema is valid", async () => {
    const req = {
        body: {
          name: "John Doe",
          age: 30,
          profilePic: "https://example.com/profile.jpg",
          workExperiences: [],
        },
        query: {},
        params: {}
      } as Request;
    await validate(schema)(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should return 400 when schema is invalid", async () => {
    const invalidReq = {
        body: {
            name: "John Doe",
            age: 30,
            profilePic: "https://example.com/profile.jpg",
            workExperiences: [
              {
                company: "Acme Inc.",
                jobTitle: "Software Engineer",
                startDate: new Date("2022-01-01"),
                endDate: new Date("2021-03-31"),
                companyLogo: "https://example.com/acme.jpg",
                jobDescription: "Lorem ipsum dolor sit amet",
              },
            ],
          },
      query: {},
      params: {},
    } as Request;

    await validate(schema)(invalidReq, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "Bad Request!",
      message: 'Start date must be less than end date!',
    });
  });
});
