import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
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
      <div className="profile-header" data-testid="profile-header">
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
        <Row>
          <Col>
            <Form.Label htmlFor="name">Name: </Form.Label>
            <Form.Control type="text" id="name" name="name" value={name} onChange={handleNameChange} required isInvalid={name === ''}/>
            <Form.Control.Feedback type="invalid">Name is required.</Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Label htmlFor="age">Age: </Form.Label>
            <Form.Control type="text" id="age" name="age" value={age} onChange={handleAgeChange} required isInvalid={age <= 0}/>
            <Form.Control.Feedback type="invalid">Age cannot be 0 or less.</Form.Control.Feedback>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProfileHeader;
