import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProfilePage from '../src/ProfilePage';
import '@testing-library/jest-dom'
// import '@types/jest'

import { rest } from "msw";
import { setupServer } from "msw/node";


const server = setupServer(
    rest.get(`${process.env.REACT_APP_LOCAL_URL}/api/v1/profile`, (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json({
          data: [
            {
              id: 1,
              name: 'John Doe',
              age: 30,
              profilePic: 'https://example.com/profile.png',
              workExperiences: [
                {
                  startDate: '2021-01-01',
                  endDate: '2022-02-01',
                  jobTitle: 'Software Developer',
                  company: 'Acme Inc.',
                  companyLogo: 'https://example.com/acme.png',
                  jobDescription: 'Developed software for Acme Inc.',
                },
              ],
            },
          ],
        })
      );
    }),
    rest.patch(
        `${process.env.REACT_APP_LOCAL_URL}/api/v1/profile/1`,
        (req, res, ctx) => {
          return res(ctx.json({ status: 200 }));
        }
      ),
  );

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProfilePage Rendering', () => {
    

    it('renders without errors', () => {
        render(<ProfilePage />);
    });

    it('renders the ProfileContent and ProfileHeader component', () => {
        render(<ProfilePage />);
        const profileContent = screen.getByTestId('profile-content');
        expect(profileContent).toBeInTheDocument();
        const profileHeader = screen.getByTestId('profile-header');
        expect(profileHeader).toBeInTheDocument();
      });

    it('renders the ProfileContent and ProfileHeader component', () => {
    render(<ProfilePage />);
    const profileContent = screen.getByTestId('profile-content');
    expect(profileContent).toBeInTheDocument();
    const profileHeader = screen.getByTestId('profile-header');
    expect(profileHeader).toBeInTheDocument();
    });
});

describe('ProfilePage API Calls', () => {
    it('should get data correctly and render it on the page', async () => {
        
      render(<ProfilePage />);
    
      await waitFor(() => {
        const nameInput = screen.getByRole('textbox', { name: /Name:/i }) as HTMLInputElement;
        expect(nameInput.value).toEqual('John Doe');
      })
    });
    it('should call the saveProfile function ', async () => {
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        render(<ProfilePage />);
        await waitFor(() => {
          const nameInput = screen.getByRole('textbox', { name: /Name:/i }) as HTMLInputElement;
          expect(nameInput.value).toEqual('John Doe');
        })
        fireEvent.submit(screen.getByTestId('profile-form'));

        await waitFor(() => expect(mockAlert).toHaveBeenCalledWith('Profile updated successfully!'));
        mockAlert.mockRestore();
      });
      it('saveProfile should not run if date is not valid', async () => {
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        const { getByLabelText } = render(<ProfilePage />);
        await waitFor(() => {
          const nameInput = screen.getByRole('textbox', { name: /Name:/i }) as HTMLInputElement;
          expect(nameInput.value).toEqual('John Doe');
          const startDateInput = getByLabelText(/Start Date:/i);
          fireEvent.change(startDateInput, { target: { value: '2023-01-01' } });
          const endDateInput = getByLabelText(/End Date:/i);
          fireEvent.change(endDateInput, { target: { value: '2022-12-31' } });
        })
        fireEvent.submit(screen.getByTestId('profile-form'));

        await waitFor(() => expect(mockAlert).not.toHaveBeenCalled());
        mockAlert.mockRestore();
        
      });
});

describe(' Handle Changes and Functions', () => {
  it('should update the name state when the input value changes', () => {
    const { getByLabelText } = render(<ProfilePage />);
    const nameInput = getByLabelText(/Name:/i);

    fireEvent.change(nameInput, { target: { value: 'John' } });

    expect(nameInput).toHaveValue('John');
  });
  it('should update the profilePic state when a file is selected', () => {
    const { container } = render(<ProfilePage />);
    const fileInput = container.querySelector('#profilePic') as HTMLInputElement;
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(fileInput.files).toHaveLength(1);
    expect(fileInput.files?.[0].name).toBe('test.png');
  });
  
  
  it('should update the age state when the input value changes', () => {
    const { getByLabelText } = render(<ProfilePage />);
    const ageInput = getByLabelText(/Age:/i);
  
    fireEvent.change(ageInput, { target: { value: '30' } });
  
    expect(ageInput).toHaveValue('30');
  });

  it('should update the start date state when the input value changes', () => {
    const { getByLabelText } = render(<ProfilePage />);
    const startDateInput = getByLabelText(/Start Date:/i);

    fireEvent.change(startDateInput, { target: { value: '2022-01-01' } });

    expect(startDateInput).toHaveValue('2022-01-01');
  });

  it('should update the end date state when the input value changes', () => {
    const { getByLabelText } = render(<ProfilePage />);
    const endDateInput = getByLabelText(/End Date:/i);

    fireEvent.change(endDateInput, { target: { value: '2022-12-31' } });

    expect(endDateInput).toHaveValue('2022-12-31');
  });

  it('should update the isCurrent state and endDate state when the checkbox is checked', () => {
    const { getByLabelText } = render(<ProfilePage />);
    const checkboxInput = getByLabelText(/Current Job:/i);
    fireEvent.click(checkboxInput);

    expect(checkboxInput).toBeChecked();

    const endDateInput = getByLabelText(/End Date:/i);
    expect(endDateInput).toHaveValue('');
    expect(endDateInput).toHaveAttribute('disabled');

    fireEvent.change(endDateInput, { target: { value: '2022-12-31' } });
    expect(endDateInput).toHaveValue('2022-12-31');

    fireEvent.click(checkboxInput);
    expect(checkboxInput).not.toBeChecked();
    expect(checkboxInput).not.toHaveAttribute('disabled');

    expect(endDateInput).toHaveValue('');
  });

  it('should update the job title state when the input value changes', () => {
    const { getByLabelText } = render(<ProfilePage />);
    const jobTitleInput = getByLabelText(/Job Title:/i);

    fireEvent.change(jobTitleInput, { target: { value: 'Software Engineer' } });

    expect(jobTitleInput).toHaveValue('Software Engineer');
  });

  it('should update the company state when the input value changes', () => {
    const { getByLabelText } = render(<ProfilePage />);
    const companyInput = getByLabelText(/Company:/i);

    fireEvent.change(companyInput, { target: { value: 'Acme Inc.' } });

    expect(companyInput).toHaveValue('Acme Inc.');
  });

  it('should update the job description state when the input value changes', () => {
    const { getByLabelText } = render(<ProfilePage />);
    const jobDescriptionInput = getByLabelText(/Job Description:/i);

    fireEvent.change(jobDescriptionInput, { target: { value: 'Developed web applications using React.js' } });

    expect(jobDescriptionInput).toHaveValue('Developed web applications using React.js');
  });
  it('should add a new work experience when handleAddWorkExperience is called', () => {
    const component = render(<ProfilePage />);
    const addButton = component.getByText('Add Work Experience');
    fireEvent.click(addButton);
    expect(component.getAllByTestId('work-experience-form')).toHaveLength(2);
  });

  it('should remove a work experience when handleRemoveWorkExperience is called', () => {
    const component = render(<ProfilePage />);
    const removeButton = component.getAllByText('Remove')[0];
    fireEvent.click(removeButton);
    expect(component.queryAllByTestId('work-experience-form')).not.toHaveLength(1); // this will return empty array instead of throw error

  });
});



