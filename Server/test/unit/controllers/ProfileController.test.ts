import { Request, Response } from "express";
import ProfileController from "../../../src/controller/ProfileController";
import { Profile } from "../../../src/Model/Profile";
import { WorkExperience } from "../../../src/Model/WorkExperience";
import { ProfileRepo } from "../../../src/repository/ProfileRepo";
import { Sequelize } from "sequelize-typescript";

describe("ProfileController", () => {
    let sequelize: Sequelize;
  
    beforeAll(async () => {
        sequelize = new Sequelize({
            storage: ":memory:",
            models: [WorkExperience, Profile],
            dialect: "postgres",
            logging: false,
        });
    
        await sequelize.authenticate();    
      });

      afterAll(async () => {
        await sequelize.close();
      });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe("create", () => {
      it("should create a new profile and return the new profile id", async () => {
        const profileRepoSaveSpy = jest.spyOn(ProfileRepo.prototype, "save").mockResolvedValueOnce(1);
        
        let mockRequest = {} as Request;
        let mockResponse = {} as Response;

        mockRequest.body = {
          name: "John",
          age: 30,
          profilePic: "http://example.com/profile.jpg",
          workExperiences: [],
        };

        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn();

        await ProfileController.create(mockRequest, mockResponse);
  
        expect(profileRepoSaveSpy).toHaveBeenCalledWith(expect.any(Profile));
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: "Created",
          message: "Successfully Created Profile",
          id: 1,
        });
      });
  
      it("should return an error response if saving to the repository fails", async () => {
        jest.spyOn(ProfileRepo.prototype, "save").mockRejectedValueOnce('Failed to save profile');
        
        let mockRequest = {} as Request;
        let mockResponse = {} as Response;

        mockRequest.body = {
          name: "John",
          age: 30,
          profilePic: "http://example.com/profile.jpg",
          workExperiences: [],
        };

        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn();
  
        await ProfileController.create(mockRequest, mockResponse);
  
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: "Internal Server Error",
          message: "Failed to save profile",
        });
      });
    });

    describe("update", () => {
        it("should update an existing profile and return a success response", async () => {
          const profileRepoUpdateSpy = jest.spyOn(ProfileRepo.prototype, "update").mockResolvedValueOnce();
          const mockProfileId = '1';
          
          let mockRequest = {} as Request;
          let mockResponse = {} as Response;
      
          mockRequest.params = { id: mockProfileId };
          mockRequest.body = {
            name: "John",
            age: 30,
            profilePic: "http://example.com/profile.jpg",
            workExperiences: [],
          };
      
          mockResponse.status = jest.fn().mockReturnThis();
          mockResponse.json = jest.fn();
      
          await ProfileController.update(mockRequest, mockResponse);
      
          expect(profileRepoUpdateSpy).toHaveBeenCalledWith(expect.any(Profile));
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "Ok!",
            message: "Successfully updated Profile data!",
          });
        });
      
        it("should return an error response if updating the repository fails", async () => {
          jest.spyOn(ProfileRepo.prototype, "update").mockRejectedValueOnce('Failed to update profile');
          const mockProfileId = '1';
          
          let mockRequest = {} as Request;
          let mockResponse = {} as Response;
      
          mockRequest.params = { id: mockProfileId };
          mockRequest.body = {
            name: "John",
            age: 30,
            profilePic: "http://example.com/profile.jpg",
            workExperiences: [],
          };
      
          mockResponse.status = jest.fn().mockReturnThis();
          mockResponse.json = jest.fn();
      
          await ProfileController.update(mockRequest, mockResponse);
      
          expect(mockResponse.status).toHaveBeenCalledWith(500);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "Internal Server Error!",
            message: "Internal Server Error!",
          });
        });
      });
      describe("delete", () => {
        it("should delete a profile and return a success message", async () => {
          const profileRepoDeleteSpy = jest.spyOn(ProfileRepo.prototype, "delete").mockResolvedValueOnce();
          const mockProfileId = '1';
          const mockRequest = {} as Request;
          const mockResponse = {} as Response;

          mockRequest.params = { id: mockProfileId.toString() };
      
          mockResponse.status = jest.fn().mockReturnThis();
          mockResponse.json = jest.fn();
      
          await ProfileController.delete(mockRequest, mockResponse);
      
          expect(profileRepoDeleteSpy).toHaveBeenCalledWith(parseInt(mockProfileId));
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "Ok!",
            message: "Successfully deleted profile!",
          });
        });
      
        it("should return an error response if deleting from the repository fails", async () => {
          const mockErrorMessage = "Failed to delete profile";
          jest.spyOn(ProfileRepo.prototype, "delete").mockRejectedValueOnce(mockErrorMessage);
          const mockProfileId = '1';
          const mockRequest = {} as Request;
          const mockResponse = {} as Response;

          mockRequest.params = { id: mockProfileId };
      
          mockResponse.status = jest.fn().mockReturnThis();
          mockResponse.json = jest.fn();
      
          await ProfileController.delete(mockRequest, mockResponse);
      
          expect(mockResponse.status).toHaveBeenCalledWith(500);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "Internal Server Error!",
            message: mockErrorMessage,
          });
        });
      });
      describe("findById", () => {
        it("should find and return the profile with the given id", async () => {
          const mockProfile = Profile.build({
            name: 'John Doe',
            age: 30,
            profile_pic: 'https://example.com/profile_pic.jpg',
            work_experiences: [],
          });
          const profileRepoRetrieveByIdSpy = jest.spyOn(ProfileRepo.prototype, "retrieveById").mockResolvedValueOnce(mockProfile);
          
          let mockRequest = {} as Request;
          let mockResponse = {} as Response;
      
          const mockProfileId = '1';
          mockRequest.params = { id: mockProfileId };
      
          mockResponse.status = jest.fn().mockReturnThis();
          mockResponse.json = jest.fn();
      
          await ProfileController.findById(mockRequest, mockResponse);
      
          expect(profileRepoRetrieveByIdSpy).toHaveBeenCalledWith(parseInt(mockProfileId,10));
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "Ok!",
            message: "Successfully fetched profile by id!",
            data: mockProfile,
          });
        });
      
        it("should return an error response if retrieval from the repository fails", async () => {
          jest.spyOn(ProfileRepo.prototype, "retrieveById").mockRejectedValueOnce('Failed to retrieve profile');
          
          let mockRequest = {} as Request;
          let mockResponse = {} as Response;
      
          const mockProfileId = '1';
          mockRequest.params = { id: mockProfileId };
      
          mockResponse.status = jest.fn().mockReturnThis();
          mockResponse.json = jest.fn();
      
          await ProfileController.findById(mockRequest, mockResponse);
      
          expect(mockResponse.status).toHaveBeenCalledWith(500);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "Internal Server Error!",
            message: "Profile not found",
          });
        });
      });     
      describe("findAll", () => {
        it("should return all profiles with translated work experiences", async () => {
          const mockProfiles = [
            Profile.build({
              name: "John Doe",
              age: 30,
              profile_pic: "https://example.com/profile_pic.jpg",
              work_experiences: [],
            }),
            Profile.build({
              name: "Jane Smith",
              age: 25,
              profile_pic: "https://example.com/profile_pic.jpg",
              work_experiences: [],
            }),
          ];
          const profileRepoRetrieveAllSpy = jest.spyOn(ProfileRepo.prototype, "retrieveAll").mockResolvedValueOnce(mockProfiles);
      
          let mockRequest = {} as Request;
          let mockResponse = {} as Response;
      
          mockResponse.status = jest.fn().mockReturnThis();
          mockResponse.json = jest.fn();
      
          await ProfileController.findAll(mockRequest, mockResponse);
      
          expect(profileRepoRetrieveAllSpy).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "Ok!",
            message: "Successfully fetched all Profile data!",
            data: [
              {
                id: mockProfiles[0].id,
                name: mockProfiles[0].name,
                age: mockProfiles[0].age,
                profilePic: mockProfiles[0].profile_pic,
                workExperiences: [],
              },
              {
                id: mockProfiles[1].id,
                name: mockProfiles[1].name,
                age: mockProfiles[1].age,
                profilePic: mockProfiles[1].profile_pic,
                workExperiences: [],
              },
            ],
          });
        });
      
        it("should return an error response if retrieval from the repository fails", async () => {
          jest.spyOn(ProfileRepo.prototype, "retrieveAll").mockRejectedValueOnce("Failed to retrieve profiles");
      
          let mockRequest = {} as Request;
          let mockResponse = {} as Response;
      
          mockResponse.status = jest.fn().mockReturnThis();
          mockResponse.json = jest.fn();
      
          await ProfileController.findAll(mockRequest, mockResponse);
      
          expect(mockResponse.status).toHaveBeenCalledWith(500);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "Internal Server Error!",
            message: "Internal Server Error!",
          });
        });
      });
       
  });
  
