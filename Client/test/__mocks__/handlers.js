import { rest } from "msw";
const localhost = process.env.REACT_APP_LOCAL_URL;
export const handlers = [
  rest.get(`${localhost}/api/v1/profile`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        data: [
          {
            id: 1,
            name: "John Doe",
            age: 30,
            profilePic: "https://example.com/profile.png",
            workExperiences: [
              {
                startDate: "2021-01-01",
                endDate: "2022-01-01",
                jobTitle: "Software Developer",
                company: "Acme Inc.",
                companyLogo: "https://example.com/acme.png",
                jobDescription: "Developed software for Acme Inc.",
              },
            ],
          },
        ],
      })
    );
  }),
];
