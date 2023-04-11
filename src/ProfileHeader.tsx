import React from 'react';
import { Form } from 'react-bootstrap';

interface ProfileHeaderProps {
  profilePicUrl: string;
  name: string;
  age: number;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAgeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProfilePicUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class ProfileHeader extends React.Component<ProfileHeaderProps, {}> {
  constructor(props: ProfileHeaderProps) {
    super(props);
  }


  render() {
    const { profilePicUrl, name, age, handleNameChange, handleAgeChange, handleProfilePicUrlChange } = this.props;

    return (
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={profilePicUrl} alt="Profile Avatar" />
          <Form.Control type="text" id="profilePicUrl" name="profilePicUrl" defaultValue={profilePicUrl} onChange={handleProfilePicUrlChange} />
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
