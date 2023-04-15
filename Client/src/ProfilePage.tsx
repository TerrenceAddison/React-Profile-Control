import React, { ChangeEvent } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import profilePic from './img/placeholder.jpg';
import { Button, Container, Form, Navbar } from 'react-bootstrap';
import './ProfilePage.css'
import api from "./api";
const fetch = require('node-fetch');

interface ProfilePageState {
  id? : number;
  name: string;
  age: number;
  profilePic: string;
  workExperiences: WorkExperience[];
  new: boolean;
}

interface WorkExperience {
  id? : number;
  startDate: string;
  endDate: string | null;
  jobTitle: string;
  company: string;
  companyLogo: string;
  jobDescription: string;
  isCurrent: boolean;
}

class ProfilePage extends React.Component<{}, ProfilePageState> {
    private formRef = React.createRef<HTMLFormElement>();
    constructor(props: {}) {
      super(props);
      this.formRef = React.createRef();
      // sample data
      this.state = {
        name: '',
        age: 0,
        profilePic: profilePic,
        workExperiences: [
          {
            startDate: '',
            endDate: '',
            jobTitle: '',
            company: '',
            companyLogo: '',
            jobDescription:'',
            isCurrent: false,
          },
        ],
        new: true,
      };
    }
  
    takeDataFromStorage() : boolean {
      const profileData = localStorage.getItem('profileData');
      if (profileData) {
        const data = JSON.parse(profileData);
        this.setState(data);
        localStorage.clear();
        return true;
      }
      return false;
    }

    componentDidMount() {
      let isOnline = navigator.onLine;
      if (isOnline) {
          fetch('https://www.google.com/', { // Check for internet connectivity
              mode: 'no-cors',
              })
          .then(() => {
          }).catch(() => {
            isOnline = false;
          }  )
  
      }
      if(isOnline)
      {
        api.get('/profile').then((res) => {
          

          const data = res.data.data;
          if(data.length !== 0) {

            // stored data takes precedence
            const taken = this.takeDataFromStorage();
            this.setState({new: false});
            if(taken) return;

            for(const element of data[0].workExperiences) {
              if(element.endDate === null){
                element.isCurrent = true;
              }
            }
            this.setState({
              id: data[0].id,
              name: data[0].name,
              age: data[0].age,
              profilePic: data[0].profilePic,
              workExperiences: data[0].workExperiences,
              new: false,
            });
          }
          else {
            // stored data takes precedence
            const taken = this.takeDataFromStorage();
            this.setState({new: true});
            if(taken) return;
            this.setState({
              name: '',
              age: 0,
              profilePic: profilePic,
              workExperiences: [
                {
                  startDate: '',
                  endDate: '',
                  jobTitle: '',
                  company: '',
                  companyLogo: '',
                  jobDescription: '',
                  isCurrent: false,
                },
              ],
              new: true,
            });
          }
        });
      }
      else
      {
        const profileData = localStorage.getItem('profileData');
        if (profileData) {
          const data = JSON.parse(profileData);
          this.setState(data);
          localStorage.clear();
        }
      }
    }

    saveProfile = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const isValid = this.areDatesValid();
      if (!isValid) {
        event.stopPropagation();
      }
      else{
        let isOnline = navigator.onLine;
        if (isOnline) {
            fetch('https://www.google.com/', { // Check for internet connectivity
                mode: 'no-cors',
                })
            .then(() => {
            }).catch(() => {
              isOnline = false;
            }  )
        }
        if(isOnline){
          const { name, profilePic, age, workExperiences } = this.state;
          const profileData = {
            name,
            profilePic,
            age,
            workExperiences,
          };
          if(this.state.new) {
            for(let i = 0; i < workExperiences.length; i++) {
              workExperiences[i].id = i+1;
            }
            api.post('/profile', profileData).then((res) => {
              this.setState({new: false, id: res.data.id}); 
              if(res.status === 201)
              {
                window.alert("Profile created successfully!");
              }
              else{
                window.alert("Failed to create profile!");
              }
            });
          }
          else {
            api.patch(`/profile/${this.state.id}`, profileData).then((res) => {
              if(res.status === 200)
              {
                window.alert("Profile updated successfully!");
              }
              else{
                window.alert("Failed to update profile!");
              }
            });
          }
        }
        else {
          localStorage.setItem('profileData', JSON.stringify(this.state));
        }

      }
    };

    
  areDatesValid = () => {
    let isDatesValid = true;
    this.state.workExperiences.forEach((experience, index) => {
      if (experience.endDate !== null && experience.startDate > experience.endDate) {
        isDatesValid = false;
      }
    });

    return isDatesValid;
  };

    handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      this.setState({ name: event.target.value });
    };

    handleProfilePicChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          let newProfilePic = e.target?.result as string;
          this.setState({ profilePic: newProfilePic });
        };
        reader.readAsDataURL(file);
      }
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

    handleCheckedChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const newWorkExperiences = [...this.state.workExperiences];
      const newDate = new Date(newWorkExperiences[index].startDate);
      newDate.setDate(newDate.getDate() + 1);  
      const newEndDate = (isNaN(newDate.getTime()) ? '' : newDate.toISOString().slice(0, 10));

      newWorkExperiences[index] = {
        ...newWorkExperiences[index],
        isCurrent: event.target.checked,
        endDate: event.target.checked ? null : newEndDate,
      };
      this.setState({ workExperiences: newWorkExperiences });
    }

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
      
    handleCompanyLogoChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const newWorkExperiences = [...this.state.workExperiences];
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newWorkExperiences[index].companyLogo = e.target?.result as string;
          this.setState({ workExperiences: newWorkExperiences });
        };
        reader.readAsDataURL(file);
      }
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
            companyLogo: "",
            jobDescription: "",
            isCurrent: false,
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
        const { name, age, profilePic, workExperiences } = this.state;
        return (
          <Form ref={this.formRef} onSubmit={this.saveProfile.bind(this)} data-testid="profile-form">
            <Navbar bg="dark">
              <Container>
                <Navbar.Brand><h1 className = "navbar-txt">Profile Page</h1></Navbar.Brand>
              </Container>
            </Navbar>
            <ProfileHeader
              profilePic={profilePic}
              name={name}
              age={age}
              handleNameChange={this.handleNameChange}
              handleProfilePicChange={this.handleProfilePicChange}
              handleAgeChange={this.handleAgeChange}
            />
            <ProfileContent
              workExperiences={workExperiences}
              handleStartDateChange={this.handleStartDateChange}
              handleEndDateChange={this.handleEndDateChange}
              handleJobTitleChange={this.handleJobTitleChange}
              handleCompanyChange={this.handleCompanyChange}
              handleCompanyLogoChange={this.handleCompanyLogoChange}
              handleJobDescriptionChange={this.handleJobDescriptionChange}
              handleAddWorkExperience={this.handleAddWorkExperience}
              handleRemoveWorkExperience={this.handleRemoveWorkExperience}
              handleCheckedChange={this.handleCheckedChange}
            />
            <Button className="save-btn" type="submit" variant="primary">Save Profile</Button>
          </Form>

        );
      }
      
      
      
}
  export default ProfilePage; 
  
