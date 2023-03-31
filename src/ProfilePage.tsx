import React, { useState } from 'react';
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
  

    function saveProfile(profileData: any) {
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

    return (
        <div className="profile-page-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src={profilePicUrl} alt="Profile Avatar" />
            </div>
            <div className="profile-info">
              <h1 className="profile-name">
                <input type="text" defaultValue={name} />
              </h1>
              <p className="profile-age">
                <label htmlFor="age">Age: </label>
                <input type="number" id="age" name="age" defaultValue={age} />
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
                      <label htmlFor={`start-date-${index}`}>Start Date: </label>
                      <input
                        type="date"
                        id={`start-date-${index}`}
                        name={`start-date-${index}`}
                        defaultValue={experience.startDate}
                      />
                      <label htmlFor={`end-date-${index}`}>End Date: </label>
                      <input
                        type="date"
                        id={`end-date-${index}`}
                        name={`end-date-${index}`}
                        defaultValue={experience.endDate}
                      />
                    </div>
                    <div className="work-experience-info">
                      <label htmlFor={`job-title-${index}`}>Job Title: </label>
                      <input
                        type="text"
                        id={`job-title-${index}`}
                        name={`job-title-${index}`}
                        defaultValue={experience.jobTitle}
                      />
                      <label htmlFor={`company-${index}`}>Company: </label>
                      <input
                        type="text"
                        id={`company-${index}`}
                        name={`company-${index}`}
                        defaultValue={experience.company}
                      />
                      <label htmlFor={`company-logo-${index}`}>Company Logo: </label>
                      <input
                        type="text"
                        id={`company-logo-${index}`}
                        name={`company-logo-${index}`}
                        defaultValue={experience.companyLogoUrl}
                      />
                      <label htmlFor={`job-description-${index}`}>Job Description: </label>
                      <textarea
                        id={`job-description-${index}`}
                        name={`job-description-${index}`}
                        defaultValue={experience.jobDescription}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={() => addNewExperience()}>Add Work Experience</button>
          </div>
          <div className="profile-footer">
            <button onClick={saveProfile}>Save Profile</button>
          </div>
        </div>
      );
}
  export default ProfilePage; 
  
