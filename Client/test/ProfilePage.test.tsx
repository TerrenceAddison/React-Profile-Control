import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProfilePage from '../src/ProfilePage';
import '@testing-library/jest-dom'
import axios from 'axios';
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
    
      await waitFor(() => screen.getByRole('textbox', { name: /Name:/i }));
      const nameInput = screen.getByRole('textbox', { name: /Name:/i }) as HTMLInputElement;
      expect(nameInput.value).toEqual('John Doe');
    });
});

