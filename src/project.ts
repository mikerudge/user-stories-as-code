import json2csv from 'json2csv';
import uniqid from 'uniqid';
import CRUDStories from './CRUDStories';

import Department from './department';
import { Epic } from './epic';
import { Model } from './models';
import { Platform } from './platforms';
import Sprint from './sprint';
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
  platforms: Set<Platform> = new Set();
  epics: Set<Epic> = new Set();
  sprints: Set<Sprint> = new Set();

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

    if (story.sprint) {
      this.sprints.add(story.sprint);
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
