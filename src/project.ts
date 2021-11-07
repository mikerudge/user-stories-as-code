import json2csv from 'json2csv';
import uniqid from 'uniqid';

import Department from './department';
import { Epic } from './epic';
import { Model } from './models';
import { Platform } from './platforms';
import Task from './task';
import UserStory from './userStory';
import UserType, { UserTypeProps } from './userType';

export type ProjectProps = {
  name: string;
  userTypes?: UserType[];
};

export default class Project {
  readonly id: string;
  readonly name: string = '';
  userTypes: Set<UserType> = new Set();
  stories: Set<UserStory> = new Set();
  departments: Set<Department> = new Set();
  models: Set<Model> = new Set();
  platforms: Set<Platform> = new Set();
  epics: Set<Epic> = new Set();

  constructor(props: ProjectProps) {
    this.id = uniqid();
    this.name = props.name;
    this.userTypes = new Set(props.userTypes);
  }

  /**
   * @description Adds a new user story to the project
   * @param {UserStory} story
   * @returns {Project} project
   */
  addStory = (story: UserStory): Project => {
    this.stories.add(story);

    if (story.departments.size > 0) {
      story.departments.forEach((department) => this.addDepartment(department));
    }

    if (story.epic) {
      this.epics.add(story.epic);
    }

    if (story.platform) {
      this.addPlatform(story.platform);
    }

    return this;
  };

  /**
   * @param UserTypeProps
   * @returns
   * @memberof Project
   * @description A helper to add a list of user stories at once
   */

  addManyStories = (props: UserStory[]): Project => {
    props.forEach((story) => this.addStory(story));
    return this;
  };

  /**
   * @description add a platform to the project
   * @author Mike Rudge
   * @date 07/11/2021
   * @param {Platform} platform
   * @memberof Project
   */
  addPlatform = (platform: Platform): Project => {
    this.platforms.add(platform);
    return this;
  };

  addManyPlatforms = (platforms: Platform[]): Project => {
    platforms.forEach((platform) => this.addPlatform(platform));
    return this;
  };

  /**
   * @description Allows users to add a new department to the project
   * @param name
   * @returns
   */
  addDepartment = (department: Department): Project => {
    this.departments.add(department);
    return this;
  };

  /**
   * @description A helper to add many departments at once
   * @param names
   * @returns
   * @memberof Project
   */
  addManyDepartments = (departments: Department[]): Project => {
    departments.forEach((department) => this.addDepartment(department));
    return this;
  };

  /**
   * @description Allows users to add a new user type to the project
   * @param params UserTypeProps
   * @returns
   */
  addUserType = (userType: UserType): Project => {
    this.userTypes.add(userType);
    return this;
  };

  /**
   * @description A helper to create a project at once
   * @param {UserTypeProps[]} userTypes
   * @returns {Project}
   * @memberof Project
   */
  addManyUserTypes = (userTypes: UserType[]): Project => {
    userTypes.forEach((type) => this.addUserType(type));
    return this;
  };

  /**
   * @description Add model to the project
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {Model} model
   * @memberof Project
   */
  addModel = (model: Model): Project => {
    this.models.add(model);
    return this;
  };

  /**
   * @description
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {Model[]} models
   * @memberof Project
   */
  addManyModels = (models: Model[]): Project => {
    models.forEach((model) => this.addModel(model));
    return this;
  };

  /**
   * @description Generates CRUD stories for the project based on user permissions and models
   * @returns {Project}
   * @memberof Project
   * @author Mike Rudge
   */
  generateCrudStories = (): Project => {
    this.models.forEach((model) => {
      /* -------------------------- Create Users stories -------------------------- */
      const createUsers = model.canCreate;
      createUsers.forEach((permission) => {
        const story = new UserStory({
          asA: permission.userType,
          iWant: `Create ${model.name}s`,
          soICan: 'create a new record',
        });
        this.addStory(story);

        if (this.departments.size > 0) {
          this.departments.forEach((department) => {
            const createTask = new Task({ name: `${department.name} to work on create screens for ${model.name}s` });
            story.addTask(createTask);
          });
        }
      });

      const denyCreateUsers = model.cannotCreate;

      denyCreateUsers.forEach((permission) => {
        const story = new UserStory({
          asA: permission.userType,
          iWant: `to be denied access to creating ${model.name}`,
          soICan: '',
        });
        this.addStory(story);
      });

      /* --------------------------- Read Users stories --------------------------- */

      model.canRead.forEach((permission) => {
        if (permission.condition === 'owner') {
          const ownerTask = new Task({ name: `Reject requests for ${model.name} if the user is not the owner` });
          this.addStory(
            new UserStory({
              asA: permission.userType,
              iWant: `to be able to view ${model.name}s that belong to me`,
              soICan: 'view all records',
            }).addTask(ownerTask),
          );

          this.addStory(
            new UserStory({
              asA: permission.userType,
              iWant: `See a single ${model.name} if I am the owner`,
              soICan: 'see more in depth information',
            }),
          );

          this.addStory(
            new UserStory({
              asA: permission.userType,
              iWant: `See a permission denied message for ${model.name} if I am not owner`,
              soICan: 'know I dont have access',
            }),
          );
        } else {
          this.addStory(
            new UserStory({ asA: permission.userType, iWant: `List all ${model.name}s`, soICan: 'easily navigate' }),
          );
          this.addStory(
            new UserStory({
              asA: permission.userType,
              iWant: `See a single ${model.name}`,
              soICan: 'see more in depth information',
            }),
          );
        }

        this.addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `to be able to link others directly to ${model.name}`,
            soICan: 'share links on other platforms',
          }),
        );
      });

      const denyReadyUsers = model.cannotRead;
      denyReadyUsers.forEach((permission) => {
        this.addStory(new UserStory({ asA: permission.userType, iWant: `to not access ${model.name}`, soICan: '' }));
      });

      /* -------------------------- Update Users Stories -------------------------- */
      const updateUsers = model.canUpdate;
      updateUsers.forEach((permission) => {
        this.addStory(
          new UserStory({ asA: permission.userType, iWant: `update ${model.name}s`, soICan: 'change information' }),
        );
      });

      const cannotUpdateUsers = model.cannotUpdate;
      cannotUpdateUsers.forEach((permission) => {
        this.addStory(
          new UserStory({ asA: permission.userType, iWant: `to not be able to update ${model.name}s`, soICan: '' }),
        );
      });

      /* -------------------------- Delete Users stories -------------------------- */
      const deleteUsers = model.canDelete;
      deleteUsers.forEach((permission) => {
        this.addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `delete ${model.name}s`,
            soICan: `remove unwanted ${model.name}s`,
          }),
        );
      });

      const cannotDeleteUsers = model.cannotDelete;
      cannotDeleteUsers.forEach((permission) => {
        this.addStory(
          new UserStory({ asA: permission.userType, iWant: `to not be able to delete ${model.name}s`, soICan: '' }),
        );
      });
    });

    return this;
  };

  private generateOutput = (): string => {
    return JSON.stringify(this.stories, null, 2);
  };

  readonly outputStories = (
    type: 'csv' | 'json' = 'json',
  ): string | undefined | { id: string | undefined; summary: string | undefined }[] => {
    const csvJson: { id: string; summary: string | undefined }[] = [];

    this.stories.forEach((story) => {
      csvJson.push({
        id: story.id,
        summary: story.summary,
      });
    });

    if (type === 'csv') {
      const csv = json2csv.parse(csvJson, { fields: ['id', 'summary', 'tasks'] });
      console.log(csv);
      return csv;
    }

    return csvJson;
  };
  create = () => {
    const stories: string[] = [];
    this.stories.forEach((story) => stories.push(story.create()));
    return {
      id: this.id,
      name: this.name,
      stories: stories,
    };
  };
}
