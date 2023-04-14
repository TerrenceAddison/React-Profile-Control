import React, { ChangeEvent } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import './WorkExperienceItem.css'
interface WorkExperience {
  startDate: string;
  endDate: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  jobDescription: string;
}

interface WorkExperienceProps {
  experience: WorkExperience;
  index: number;
  handleStartDateChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleEndDateChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleJobTitleChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleCompanyChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleCompanyLogoChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleJobDescriptionChange: (event: ChangeEvent<HTMLTextAreaElement>, index: number) => void;
  handleRemoveWorkExperience: (index: number) => void;
}

class WorkExperienceItem extends React.Component<WorkExperienceProps> {
    render() {
        const {
            experience,
            index,
            handleStartDateChange,
            handleEndDateChange,
            handleJobTitleChange,
            handleCompanyChange,
            handleCompanyLogoChange,
            handleJobDescriptionChange,
            handleRemoveWorkExperience
          } = this.props;

          return(
            <div key={index} className="work-experience">
            <Row>
              <Col>
                <Form.Label htmlFor={`job-title-${index}`}>Job Title: </Form.Label>
                <Form.Control
                  type="text"
                  id={`job-title-${index}`}
                  name={`job-title-${index}`}
                  value={experience.jobTitle}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleJobTitleChange(event, index)}
                  required
                  isInvalid={experience.jobTitle === ''}
                />
                <Form.Control.Feedback type="invalid">Job Title is Required</Form.Control.Feedback>
              </Col>

              <Col>
                <Form.Label htmlFor={`start-date-${index}`}>Start Date: </Form.Label>
                <Form.Control
                  type="date"
                  id={`start-date-${index}`}
                  name={`start-date-${index}`}
                  value={experience.startDate}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleStartDateChange(event, index)}
                  required
                  isInvalid={experience.startDate > experience.endDate}
                />
                <Form.Control.Feedback type="invalid">Start Date must be before End Date</Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Label htmlFor={`end-date-${index}`}>End Date: </Form.Label>
                <Form.Control
                  type="date"
                  id={`end-date-${index}`}
                  name={`end-date-${index}`}
                  value={experience.endDate}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleEndDateChange(event, index)}
                  required
                  isInvalid={experience.endDate < experience.startDate}
                  />
                <Form.Control.Feedback type="invalid">End Date must be after Start Date</Form.Control.Feedback>
              </Col>
            </Row>
            <Row>
              <Col>
                  <Form.Label htmlFor={`company-${index}`}>Company: </Form.Label>
                  <Form.Control
                    type="text"
                    id={`company-${index}`}
                    name={`company-${index}`}
                    value={experience.company}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleCompanyChange(event, index)}
                    required
                    isInvalid={experience.company === ''}
                  />
                  <Form.Control.Feedback type="invalid">Company is Required</Form.Control.Feedback>
                  <Form.Label htmlFor={`job-description-${index}`}>Job Description: </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    id={`job-description-${index}`}
                    name={`job-description-${index}`}
                    value={experience.jobDescription}
                    className='job-description-textarea'
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleJobDescriptionChange(event, index)}
                    />
              </Col>
              <Col>
                <Form.Label htmlFor={`company-logo-${index}`}>Company Logo: </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  id={`company-logo-${index}`}
                  name={`company-logo-${index}`}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleCompanyLogoChange(event, index)}
                  />
                {experience.companyLogo && (
                  <div className="company-logo">
                    <img src={experience.companyLogo} alt={experience.company} />
                  </div>
                )}
              </Col>
            </Row>
            <Button className="remove-btn" variant="danger" onClick={() => handleRemoveWorkExperience(index)}>
                Remove
            </Button>
          </div>
          )
    }
}

export default WorkExperienceItem;