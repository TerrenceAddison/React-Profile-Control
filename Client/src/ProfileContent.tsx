import React, { ChangeEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import WorkExperienceItem from './WorkExperienceItem';
import './ProfileContent.css';


interface WorkExperience {
    startDate: string;
    endDate: string;
    jobTitle: string;
    company: string;
    companyLogo: string;
    jobDescription: string;
  }
  
  interface ProfileContentProps {
    workExperiences: WorkExperience[];
    handleStartDateChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    handleEndDateChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    handleJobTitleChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    handleCompanyChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    handleCompanyLogoChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
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
            handleCompanyLogoChange,
            handleJobDescriptionChange,
            handleRemoveWorkExperience,
            handleAddWorkExperience
          } = this.props;

          return (
            <div className="profile-content" data-testid="profile-content">
              <h2>Work Experiences</h2>
                {workExperiences.map((experience, index) => (
                  <WorkExperienceItem
                    index={index}
                    experience={experience}
                    handleStartDateChange={handleStartDateChange}
                    handleEndDateChange={handleEndDateChange}
                    handleJobTitleChange={handleJobTitleChange}
                    handleCompanyChange={handleCompanyChange}
                    handleCompanyLogoChange={handleCompanyLogoChange}
                    handleJobDescriptionChange={handleJobDescriptionChange}
                    handleRemoveWorkExperience={handleRemoveWorkExperience}
                  />
                ))}
              <Button variant="secondary" onClick={handleAddWorkExperience}>
                Add Work Experience
              </Button>
            </div>
          );
    }

}

export default ProfileContent;
