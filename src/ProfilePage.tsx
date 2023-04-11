import React, { ChangeEvent } from 'react';
import './ProfilePage.css';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';

interface ProfilePageState {
  name: string;
  age: number;
  profilePicUrl: string;
  workExperiences: WorkExperience[];
}

interface WorkExperience {
  startDate: string;
  endDate: string;
  jobTitle: string;
  company: string;
  companyLogoUrl: string;
  jobDescription: string;
}

class ProfilePage extends React.Component<{}, ProfilePageState> {
    constructor(props: {}) {
      super(props);
      this.state = {
        name: 'John Doe',
        age: 30,
        profilePicUrl: '',
        workExperiences: [
          {
            startDate: '2020-01-01',
            endDate: '2021-01-01',
            jobTitle: 'Software Engineer',
            company: 'Acme Inc.',
            companyLogoUrl: 'https://www.example.com/acme-logo.png',
            jobDescription:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod enim sed eros ullamcorper tincidunt. Nulla facilisi. Proin interdum nulla et sapien accumsan, vel facilisis dolor tincidunt. Duis dapibus libero ut tellus malesuada tincidunt.',
          },
        ],
      };
    }
  

    saveProfile = () => {
      const { name, profilePicUrl, age, workExperiences } = this.state;
      const profileData = {
        name,
        profilePicUrl,
        age,
        workExperiences,
      };
      // code to save profile data to database or API
      console.log('Profile data saved:', profileData);
    };

    handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      this.setState({ name: event.target.value });
    };

    handleProfilePicUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
      this.setState({ profilePicUrl: event.target.value });
    };

    handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
      this.setState({ age: Number(event.target.value) });
    };
        
    handleStartDateChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const newWorkExperiences = [...this.state.workExperiences];
      newWorkExperiences[index] = {
        ...newWorkExperiences[index],
        startDate: event.target.value,
      };
      this.setState({ workExperiences: newWorkExperiences });
    };

    handleEndDateChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const newWorkExperiences = [...this.state.workExperiences];
      newWorkExperiences[index] = {
        ...newWorkExperiences[index],
        endDate: event.target.value,
      };
      this.setState({ workExperiences: newWorkExperiences });
    };

    handleJobTitleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const newWorkExperiences = [...this.state.workExperiences];
      newWorkExperiences[index] = {
        ...newWorkExperiences[index],
        jobTitle: event.target.value,
      };
      this.setState({ workExperiences: newWorkExperiences });
    };
      
    handleCompanyChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const newWorkExperiences = [...this.state.workExperiences];
      newWorkExperiences[index] = {
        ...newWorkExperiences[index],
        company: event.target.value,
      };
      this.setState({ workExperiences: newWorkExperiences });
    };
      
      handleCompanyLogoUrlChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newWorkExperiences = [...this.state.workExperiences];
        newWorkExperiences[index] = {
          ...newWorkExperiences[index],
          companyLogoUrl: event.target.value,
        };
        this.setState({ workExperiences: newWorkExperiences });
      };
      
      handleJobDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const newWorkExperiences = [...this.state.workExperiences];
        newWorkExperiences[index] = {
          ...newWorkExperiences[index],
          jobDescription: event.target.value,
        };
        this.setState({ workExperiences: newWorkExperiences });
      };

      handleAddWorkExperience = () => {
        const newWorkExperiences = [
          ...this.state.workExperiences,
          {
            startDate: "",
            endDate: "",
            jobTitle: "",
            company: "",
            companyLogoUrl: "",
            jobDescription: "",
          },
        ];
        this.setState({ workExperiences: newWorkExperiences });
      };
      
      handleRemoveWorkExperience = (index: number) => {
        const newWorkExperiences = [...this.state.workExperiences];
        newWorkExperiences.splice(index, 1);
        this.setState({ workExperiences: newWorkExperiences });
      };
      render() {
        const { name, age, profilePicUrl, workExperiences } = this.state;
        return (
          <div className="profile-page">
            <ProfileHeader
              profilePicUrl={profilePicUrl}
              name={name}
              age={age}
              handleNameChange={this.handleNameChange}
              handleProfilePicUrlChange={this.handleProfilePicUrlChange}
              handleAgeChange={this.handleAgeChange}
            />
            <ProfileContent
              workExperiences={workExperiences}
              handleStartDateChange={this.handleStartDateChange}
              handleEndDateChange={this.handleEndDateChange}
              handleJobTitleChange={this.handleJobTitleChange}
              handleCompanyChange={this.handleCompanyChange}
              handleCompanyLogoUrlChange={this.handleCompanyLogoUrlChange}
              handleJobDescriptionChange={this.handleJobDescriptionChange}
              handleAddWorkExperience={this.handleAddWorkExperience}
              handleRemoveWorkExperience={this.handleRemoveWorkExperience}
            />
            <button onClick={this.saveProfile}>Save Profile</button>
          </div>
        );
      }
      
      
      
}
  export default ProfilePage; 
  
