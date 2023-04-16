export const workExperienceConverterToDB = (workExperiences: any) => {
    const translatedExperiences = workExperiences.map((experience: {
        id: number,
        startDate: string,
        endDate: string,
        jobTitle: string,
        company: string,
        companyLogo: string,
        jobDescription: string
      }) => {
        return {
          id: experience.id,
          start_date: experience.startDate,
          end_date: experience.endDate,
          job_title: experience.jobTitle,
          company: experience.company,
          company_logo: experience.companyLogo,
          description: experience.jobDescription
        };
      });
    
    return translatedExperiences
}

export const workExperienceConverterToUI = (work_experiences: any) => {
  if (!work_experiences) {
    return [];
  }
  const translatedExperiences = work_experiences.map((experience: {
    id: number,
    start_date: string,
    end_date: string,
    job_title: string,
    company: string,
    company_logo: string,
    description: string
  }) => {
    return {
      id: experience.id,
      startDate: new Date(experience.start_date).toISOString().slice(0, 10),
      endDate: experience.end_date === null ? null : new Date(experience.end_date).toISOString().slice(0, 10),
      jobTitle: experience.job_title,
      company: experience.company,
      companyLogo: experience.company_logo,
      jobDescription: experience.description
    };
  });

return translatedExperiences
}

