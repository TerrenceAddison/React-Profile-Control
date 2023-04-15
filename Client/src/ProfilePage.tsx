import React, { ChangeEvent } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import profilePic from './img/placeholder.jpg';
import { Button, Container, Form, Navbar } from 'react-bootstrap';
import './ProfilePage.css'
import api from "./api";

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
  endDate: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  jobDescription: string;
}

class ProfilePage extends React.Component<{}, ProfilePageState> {
    private formRef = React.createRef<HTMLFormElement>();
    constructor(props: {}) {
      super(props);
      this.formRef = React.createRef();
      // sample data
      this.state = {
        name: 'John Doe',
        age: 30,
        profilePic: profilePic,
        workExperiences: [
          {
            startDate: '2020-01-01',
            endDate: '2021-01-01',
            jobTitle: 'Software Engineer',
            company: 'Acme Inc.',
            companyLogo: '',
            jobDescription:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod enim sed eros ullamcorper tincidunt. Nulla facilisi. Proin interdum nulla et sapien accumsan, vel facilisis dolor tincidunt. Duis dapibus libero ut tellus malesuada tincidunt.',
          },
        ],
        new: true,
      };
    }
  
    componentDidMount() {
      api.get('/profile').then((res) => {
        const data = res.data.data;
        console.log("data found");
        console.log(data);
        console.log(typeof(data));
        if(data.length !== 0) {
          console.log("work experience found");
          this.setState({
            id: data[0].id,
            name: data[0].name,
            age: data[0].age,
            profilePic: data[0].profilePic,
            workExperiences: data[0].workExperiences,
            new: false,
          },
          () => {
            console.log('new updated:', this.state.new);});
        }
        else {
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
              },
            ],
            new: true,
          });
        }
      });
    }

    saveProfile = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const isValid = this.areDatesValid();
      if (!isValid) {
        console.log("invalid form");
        event.stopPropagation();
      }
      else{
        console.log("save profile called");
        console.log(this.state.new);
        const { name, profilePic, age, workExperiences } = this.state;
        const profileData = {
          name,
          profilePic,
          age,
          workExperiences,
        };
        console.log(profileData);
        if(this.state.new) {
          for(let i = 0; i < workExperiences.length; i++) {
            workExperiences[i].id = i+1;
          }
          api.post('/profile', profileData).then((res) => {
            console.log(res);
            this.setState({new: false, id: res.data.id}); 
            if(res.data.status === 201)
            {
              window.alert("Profile created successfully!");
            }
            else{
              window.alert("Failed to create profile!");
            }
          });
        }
        else {
          console.log('patch url is', `/profile/${this.state.id}`);
          api.patch(`/profile/${this.state.id}`, profileData).then((res) => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.status);

            if(res.data.status === 200)
            {
              window.alert("Profile updated successfully!");
            }
            else{
              window.alert("Failed to update profile!");
            }
          });
        }
      }
    };

    
  areDatesValid = () => {
    let isDatesValid = true;
    this.state.workExperiences.forEach((experience, index) => {
      if (experience.startDate > experience.endDate) {
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
            />
            <Button className="save-btn" type="submit" variant="primary">Save Profile</Button>
          </Form>

        );
      }
      
      
      
}
  export default ProfilePage; 
  
