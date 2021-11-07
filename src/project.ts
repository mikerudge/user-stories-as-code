import json2csv from 'json2csv';
import uniqid from 'uniqid';

import Department from './department';
import { Model } from './models';
import Task from './task';
import UserStory from './userStory';
import UserType, { UserTypeProps } from './userType';

export type ProjectProps = {
  name: string;
};

export default class Project {
  name: string;
  userTypes: UserType[];
  stories: UserStory[];
  departments: Department[];
  models: Model[];
  id: string;
  constructor(props: ProjectProps) {
    this.name = props.name;
    this.stories = [];
    this.departments = [];
    this.userTypes = [];
    this.models = [];
    this.id = uniqid();
  }

  /**
   * @description Adds a new user story to the project
   * @param {UserStory} story
   * @returns {Project} project
   */
  addStory = (story: UserStory): Project => {
    if (!this.stories.some(({ id }) => id === story.id)) {
      this.stories.push(story);
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
   * @description Allows users to add a new department to the project
   * @param name
   * @returns
   */
  addDepartment = (department: Department): Project => {
    this.departments.push(department);
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
  addUserType = (params: UserTypeProps): Project => {
    this.userTypes.push(new UserType(params));
    return this;
  };

  /**
   * @description A helper to create a project at once
   * @param {UserTypeProps[]} userTypes
   * @returns {Project}
   * @memberof Project
   */
  addManyUserTypes = (params: UserTypeProps[]): Project => {
    params.forEach((type) => this.addUserType(type));
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
    this.models.push(model);
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

        if (this.departments.length > 0) {
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
    const csvJson = this.stories.map((story) => {
      return {
        id: story.id,
        summary: story.summary,
        tasks: story.tasks.map((task) => {
          return {
            id: task.id,
            summary: task.name,
          };
        }),
      };
    });

    if (type === 'csv') {
      const csv = json2csv.parse(csvJson, { fields: ['id', 'summary', 'tasks'] });
      console.log(csv);
      return csv;
    }

    return csvJson;
  };

  create = () => {
    return {
      id: this.id,
      name: this.name,
      userTypes: this.userTypes.map((userType) => userType.create()),
      stories: this.stories.map((story) => story.create()),
      departments: this.departments.map((department) => department.create()),
    };
  };
}
