import React from 'react';
import { Form } from 'react-bootstrap';
import './ProfileHeader.css'

interface ProfileHeaderProps {
  profilePic: string;
  name: string;
  age: number;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAgeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProfilePicChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class ProfileHeader extends React.Component<ProfileHeaderProps, {}> {
  constructor(props: ProfileHeaderProps) {
    super(props);
  }


  render() {
    const { profilePic, name, age, handleNameChange, handleAgeChange, handleProfilePicChange } = this.props;

    return (
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-wrapper">
            <Form.Label htmlFor="profilePic">
            <img src={profilePic} alt="Profile Avatar" />
            </Form.Label>
            <Form.Control type="file" id="profilePic" name="profilePic" onChange={handleProfilePicChange} accept="image/*" className="d-none" />
          </div>
          <div className="avatar-text">
            Profile Picture
          </div>
        </div>
        <div className="profile-info">
          <p className="profile-name">
            <Form.Label htmlFor="name">Name: </Form.Label>
            <Form.Control type="text" id="name" name="name" defaultValue={name} onChange={handleNameChange} />
          </p>
          <p className="profile-age">
            <Form.Label htmlFor="age">Age: </Form.Label>
            <Form.Control type="number" id="age" name="age" defaultValue={age} onChange={handleAgeChange} />
          </p>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
