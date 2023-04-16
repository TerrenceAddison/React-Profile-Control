import { workExperienceConverterToDB, workExperienceConverterToUI } from "../../../src/helper/workExperienceConverter";

describe("workExperienceConverterToDB", () => {
  it("should convert work experiences to DB format", () => {
    const input = [
      {
        id: 1,
        startDate: "2022-01-01",
        endDate: "2022-02-01",
        jobTitle: "Software Engineer",
        company: "Acme Inc.",
        companyLogo: "https://example.com/acme.jpg",
        jobDescription: "Lorem ipsum dolor sit amet",
      },
    ];

    const expectedOutput = [
      {
        id: 1,
        start_date: "2022-01-01",
        end_date: "2022-02-01",
        job_title: "Software Engineer",
        company: "Acme Inc.",
        company_logo: "https://example.com/acme.jpg",
        description: "Lorem ipsum dolor sit amet",
      },
    ];

    expect(workExperienceConverterToDB(input)).toEqual(expectedOutput);
  });
});

describe("workExperienceConverterToUI", () => {
  it("should convert work experiences to UI format", () => {
    const input = [
      {
        id: 1,
        start_date: "2022-01-01",
        end_date: "2022-02-01",
        job_title: "Software Engineer",
        company: "Acme Inc.",
        company_logo: "https://example.com/acme.jpg",
        description: "Lorem ipsum dolor sit amet",
      },
    ];

    const expectedOutput = [
      {
        id: 1,
        startDate: "2022-01-01",
        endDate: "2022-02-01",
        jobTitle: "Software Engineer",
        company: "Acme Inc.",
        companyLogo: "https://example.com/acme.jpg",
        jobDescription: "Lorem ipsum dolor sit amet",
      },
    ];

    expect(workExperienceConverterToUI(input)).toEqual(expectedOutput);
  });
});
