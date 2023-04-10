import React, { useState, ChangeEvent } from 'react';
import { Form, Button, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaBuilding, FaPen } from 'react-icons/fa';
import './ProfilePage.css';



function ProfilePage() {
    const [name, setName] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const [age, setAge] = useState("");
    const [workExperiences, setWorkExperiences] = useState([
      {
        startDate: "",
        endDate: "",
        jobTitle: "",
        company: "",
        companyLogoUrl: "",
        jobDescription: "",
      },
    ]);
  

    function saveProfile() {
        const profileData = {
            name,
            profilePicUrl,
            age,
            workExperiences,
          };
        // code to save profile data to database or API
        console.log("Profile data saved:", profileData);
    }

    function addNewExperience(){
        setWorkExperiences([...workExperiences, {
            startDate: "",
            endDate: "",
            jobTitle: "",
            company: "",
            companyLogoUrl: "",
            jobDescription: "",
          }]
    )
    }
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
      };
      
      const handleProfilePicUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        setProfilePicUrl(event.target.value);
      };
      
      const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAge(event.target.value);
      };
      
      const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newWorkExperiences = [...workExperiences];
        newWorkExperiences[index] = {
          ...newWorkExperiences[index],
          startDate: event.target.value,
        };
        setWorkExperiences(newWorkExperiences);
      };
      
      const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newWorkExperiences = [...workExperiences];
        newWorkExperiences[index] = {
          ...newWorkExperiences[index],
          endDate: event.target.value,
        };
        setWorkExperiences(newWorkExperiences);
      };
      
      const handleJobTitleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newWorkExperiences = [...workExperiences];
        newWorkExperiences[index] = {
          ...newWorkExperiences[index],
          jobTitle: event.target.value,
        };
        setWorkExperiences(newWorkExperiences);
      };
      
      const handleCompanyChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newWorkExperiences = [...workExperiences];
        newWorkExperiences[index] = {
          ...newWorkExperiences[index],
          company: event.target.value,
        };
        setWorkExperiences(newWorkExperiences);
      };
      
      const handleCompanyLogoUrlChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newWorkExperiences = [...workExperiences];
        newWorkExperiences[index] = {
          ...newWorkExperiences[index],
          companyLogoUrl: event.target.value,
        };
        setWorkExperiences(newWorkExperiences);
      };
      
      const handleJobDescriptionChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newWorkExperiences = [...workExperiences];
        newWorkExperiences[index] = {
          ...newWorkExperiences[index],
          jobDescription: event.target.value,
        };
        setWorkExperiences(newWorkExperiences);
      };

      const handleAddWorkExperience = () => {
        setWorkExperiences([
          ...workExperiences,
          {
            startDate: "",
            endDate: "",
            jobTitle: "",
            company: "",
            companyLogoUrl: "",
            jobDescription: "",
          },
        ]);
      };
      
      const handleRemoveWorkExperience = (index: number) => {
        const newWorkExperiences = [...workExperiences];
        newWorkExperiences.splice(index, 1);
        setWorkExperiences(newWorkExperiences);
      };
      
      return (
        <div className="profile-page-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src={profilePicUrl} alt="Profile Avatar" />
            </div>
            <div className="profile-info">
              <p className="profile-name">
                <Form.Label htmlFor="age">Name: </Form.Label>
                <Form.Control type="text" defaultValue={name} />
              </p>
              <p className="profile-age">
                <Form.Label htmlFor="age">Age: </Form.Label>
                <Form.Control type="number" id="age" name="age" defaultValue={age} />
              </p>
            </div>
          </div>
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
                        defaultValue={experience.startDate}
                      />
                      <Form.Label htmlFor={`end-date-${index}`}>End Date: </Form.Label>
                      <Form.Control
                        type="date"
                        id={`end-date-${index}`}
                        name={`end-date-${index}`}
                        defaultValue={experience.endDate}
                      />
                    </div>
                    <div className="work-experience-info">
                      <Form.Label htmlFor={`job-title-${index}`}>Job Title: </Form.Label>
                      <Form.Control
                        type="text"
                        id={`job-title-${index}`}
                        name={`job-title-${index}`}
                        defaultValue={experience.jobTitle}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleJobTitleChange(event, index)}
                      />
                      <Form.Label htmlFor={`company-${index}`}>Company: </Form.Label>
                      <Form.Control
                        type="text"
                        id={`company-${index}`}
                        name={`company-${index}`}
                        defaultValue={experience.company}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleCompanyChange(event, index)}
                      />
                      <Form.Label htmlFor={`company-logo-${index}`}>Company Logo URL: </Form.Label>
                      <Form.Control
                        type="text"
                        id={`company-logo-${index}`}
                        name={`company-logo-${index}`}
                        defaultValue={experience.companyLogoUrl}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleCompanyLogoUrlChange(event, index)}
                      />
                      <Form.Label htmlFor={`job-description-${index}`}>Job Description: </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        id={`job-description-${index}`}
                        name={`job-description-${index}`}
                        defaultValue={experience.jobDescription}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleJobDescriptionChange(event, index)}
                      />
                      <Button variant="danger" onClick={() => handleRemoveWorkExperience(index)}>Remove Work Experience</Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="primary" onClick={handleAddWorkExperience}>Add Work Experience</Button>
            <Button variant="success" onClick={saveProfile}>Save Profile</Button>
          </div>
        </div>
      );
      
}
  export default ProfilePage; 
  
