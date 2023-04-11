import React, { ChangeEvent } from 'react';
import { Form, Button } from 'react-bootstrap';


interface WorkExperience {
    startDate: string;
    endDate: string;
    jobTitle: string;
    company: string;
    companyLogoUrl: string;
    jobDescription: string;
  }
  
  interface ProfileContentProps {
    workExperiences: WorkExperience[];
    handleStartDateChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    handleEndDateChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    handleJobTitleChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    handleCompanyChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    handleCompanyLogoUrlChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    handleJobDescriptionChange: (event: ChangeEvent<HTMLTextAreaElement>, index: number) => void;
    handleRemoveWorkExperience: (index: number) => void;
    handleAddWorkExperience: () => void;
  }

class ProfileContent extends React.Component<ProfileContentProps> {
    render(){
        const {
            workExperiences,
            handleStartDateChange,
            handleEndDateChange,
            handleJobTitleChange,
            handleCompanyChange,
            handleCompanyLogoUrlChange,
            handleJobDescriptionChange,
            handleRemoveWorkExperience,
            handleAddWorkExperience
          } = this.props;

          return (
            <div className="profile-content">
              <h2>Work Experiences</h2>
              <ul className="work-experiences">
                {workExperiences.map((experience, index) => (
                  <li key={index}>
                    <div className="work-experience">
                      <div className="work-experience-dates">
                        <Form.Label htmlFor={`start-date-${index}`}>Start Date: </Form.Label>
                        <Form.Control
                          type="date"
                          id={`start-date-${index}`}
                          name={`start-date-${index}`}
                          value={experience.startDate}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => handleStartDateChange(event, index)}
                          />
                        <Form.Label htmlFor={`end-date-${index}`}>End Date: </Form.Label>
                        <Form.Control
                          type="date"
                          id={`end-date-${index}`}
                          name={`end-date-${index}`}
                          value={experience.endDate}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => handleEndDateChange(event, index)}
                          />
                      </div>
                      <div className="work-experience-details">
                        <Form.Label htmlFor={`job-title-${index}`}>Job Title: </Form.Label>
                        <Form.Control
                          type="text"
                          id={`job-title-${index}`}
                          name={`job-title-${index}`}
                          value={experience.jobTitle}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => handleJobTitleChange(event, index)}
                          />
                        <Form.Label htmlFor={`company-${index}`}>Company: </Form.Label>
                        <Form.Control
                          type="text"
                          id={`company-${index}`}
                          name={`company-${index}`}
                          value={experience.company}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => handleCompanyChange(event, index)}
                          />
                        <Form.Label htmlFor={`company-logo-url-${index}`}>Company Logo URL: </Form.Label>
                        <Form.Control
                          type="text"
                          id={`company-logo-url-${index}`}
                          name={`company-logo-url-${index}`}
                          value={experience.companyLogoUrl}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => handleCompanyLogoUrlChange(event, index)}
                          />
                        <Form.Label htmlFor={`job-description-${index}`}>Job Description: </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          id={`job-description-${index}`}
                          name={`job-description-${index}`}
                          value={experience.jobDescription}
                          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleJobDescriptionChange(event, index)}
                          />
                        <Button variant="danger" onClick={() => handleRemoveWorkExperience(index)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Button variant="secondary" onClick={handleAddWorkExperience}>
                Add Work Experience
              </Button>
            </div>
          );
    }

}

export default ProfileContent;
