import json2csv from 'json2csv';
import uniqid from 'uniqid';

import Department, { DepartmentOut } from './department';
import Epic, { EpicOutput } from './epic';
import Meta from './Meta';
import Milestone, { MilestoneOutput } from './milestone';
import Model, { ModelOutput } from './model';
import Platform, { PlatformOut } from './platform';
import Sprint, { SprintOut } from './sprint';
import Task from './task';
import TeamMember, { TeamMemberOutput } from './teamMember';
import UserStory, { UserStoryOutput } from './userStory';
import UserType, { UserTypeOutput } from './userType';

export type ProjectOptions = {
  defaultPoints?: number;
};
export type ProjectParams = {
  name: string;
  description?: string;
  key?: string;
  userTypes?: UserType[];
  owner?: TeamMember;
  stories?: UserStory[] | UserStory;
  models?: Model[];
  sprints?: Sprint[];
  epics?: Epic[];
  departments?: Department[];
  milestones?: Milestone[] | Milestone;
  teamMembers?: TeamMember[];
  tasks?: Task[];
  options?: ProjectOptions;
  platforms?: Platform[];
};

export type ProjectOutput = {
  id: string;
  name: string;
  description?: string;
  key: string;
  models: ModelOutput[];
  milestones: MilestoneOutput[];
  userTypes: UserTypeOutput[];
  stories: UserStoryOutput[];
  departments: DepartmentOut[];
  platforms: PlatformOut[];
  sprints: SprintOut[];
  epics: EpicOutput[];
  teamMembers: TeamMemberOutput[];
  totalMilestones: number;
  totalStories: number;
  totalDepartments: number;
  totalPlatforms: number;
  totalSprints: number;
  totalEpics: number;
  totalUserTypes: number;
  totalTeamMembers: number;
};

/**
 * The project class is the main class that pulls together everything and then exports it.
 * Add all the stories, models, sprints, etc. and then output the project.
 *
 * @example - Full Example
 *```ts
 * new Project({name: 'My Project',
 * key: 'MYP',
 * userTypes: [userType],
 * owner: owner,
 * stories: [userStory],
 * models: [model],
 * sprints: [sprint],
 * epics: [epic],
 * departments: [department],
 * milestones: [milestone],
 * teamMembers: [teamMember],
 * tasks: [task]})
 *```
 * @author Mike Rudge
 * @date 28/11/2021
 * @class Project
 */
export default class Project implements Meta {
  public readonly id: string;
  public name: string;
  public description: string;
  public owner: TeamMember | undefined;
  public platforms: Set<Platform> = new Set();
  public sprints = new Set<Sprint>();
  public stories = new Set<UserStory>();
  public tasks: Set<Task>;
  public teamMembers: Set<TeamMember>;
  public userTypes: Set<UserType> = new Set();
  public models: Set<Model>;
  public defaultPoints: number;
  public departments: Set<Department> = new Set();
  public epics = new Set<Epic>();
  public key: string;
  public milestones = new Set<Milestone>();

  constructor(params: ProjectParams, options: ProjectOptions = {}) {
    this.id = uniqid();
    this.name = params.name;
    this.userTypes = new Set(params.userTypes);
    if (params.stories) {
      this.addStory(params.stories);
    }

    if (params.milestones) {
      this.addMilestone(params.milestones);
    }
    this.key = params.key || params.name.slice(0, 3).toUpperCase();
    this.teamMembers = new Set(params.teamMembers);
    this.owner = params.owner;
    this.tasks = new Set(params.tasks);
    this.defaultPoints = options.defaultPoints || 0;
    this.departments = new Set(params.departments);
    this.platforms = new Set(params.platforms);
    this.sprints = new Set(params.sprints);
    this.epics = new Set(params.epics);
    this.models = new Set(params.models);
    this.description = params.description || '';
  }

  public setName(name: string): Project {
    this.name = name;
    return this;
  }

  public setDescription(description: string): Project {
    this.description = description;
    return this;
  }

  public addModel(model: Model | Model[]): Project {
    if (Array.isArray(model)) {
      model.forEach((m) => this.models.add(m));
    } else {
      this.models.add(model);
    }
    return this;
  }

  private _addEpicToProject = (epic: Epic) => {
    this.epics.add(epic);

    if (epic.milestone) {
      this.milestones.add(epic.milestone);
    }
  };

  private _addStoryToProject = (story: UserStory) => {
    if (!story.key) {
      const index = this.stories.size + 1;
      story.setKey(`${this.key}-${index}`);
    }

    this.stories.add(story);

    if (story.departments.size > 0) {
      story.departments.forEach((department) => this.addDepartment(department));
    }

    if (story.epic) {
      this.addEpic(story.epic);
    }

    if (story.platform) {
      this.addPlatform(story.platform);
    }

    if (story.sprint) {
      this.sprints.add(story.sprint);
    }

    if (story.assignee.size > 0) {
      story.assignee.forEach((member) => this.addTeamMember(member));
    }

    if (story.asA) {
      this.addUserType(story.asA);
    }
  };

  public addSprint(sprint: Sprint | Sprint[]): Project {
    if (Array.isArray(sprint)) {
      sprint.forEach((s) => this.addSprint(s));
    } else {
      this.sprints.add(sprint);
    }

    return this;
  }

  /**
   * @description Allows users to add a new department to the project
   * @param name
   * @returns
   */
  public addDepartment(department: Department | Department[]): Project {
    if (Array.isArray(department)) {
      department.forEach((d) => this.departments.add(d));
    } else {
      this.departments.add(department);
    }
    return this;
  }

  public setKey(key: string): Project {
    this.key = key;
    return this;
  }

  /**
   * @description add milestone to project
   * @author Mike Rudge
   * @date 16/11/2021
   * @param {(Milestone | Milestone[])} milestone
   * @memberof Project
   */
  public addMilestone(milestone: Milestone | Milestone[]): Project {
    if (Array.isArray(milestone)) {
      milestone.forEach((m) => this.milestones.add(m));
    } else {
      this.milestones.add(milestone);
    }
    return this;
  }

  public setOwner(owner: TeamMember): Project {
    this.owner = owner;

    return this;
  }

  /**
   * @description add a platform to the project
   * @author Mike Rudge
   * @date 07/11/2021
   * @param {Platform} platform
   * @memberof Project
   */
  public addPlatform(platform: Platform | Platform[]): Project {
    if (Array.isArray(platform)) {
      platform.forEach((p) => this.platforms.add(p));
    } else {
      this.platforms.add(platform);
    }
    return this;
  }

  /**
   * @description a simple alias for addStory
   * @author Mike Rudge
   * @date 14/11/2021
   * @param {UserStory[]} stories
   * @memberof Project
   */
  public addStories(stories: UserStory[]): Project {
    stories.forEach((story) => this.addStory(story));
    return this;
  }

  /**
   * @description Adds a new user story to the project
   * @param {UserStory | UserStory[]} story
   * @returns {Project} project
   */
  public addStory(story: UserStory | UserStory[]): Project {
    if (Array.isArray(story)) {
      story.forEach((s) => this._addStoryToProject(s));
    } else {
      this._addStoryToProject(story);
    }

    return this;
  }

  public addTask(tasks: Task | Task[]): Project {
    if (Array.isArray(tasks)) {
      tasks.forEach((task) => {
        this.tasks.add(task);
      });
    } else {
      this.tasks.add(tasks);
    }

    return this;
  }

  public addTeamMember(teamMember: TeamMember | TeamMember[]): Project {
    if (Array.isArray(teamMember)) {
      teamMember.forEach((member) => this.teamMembers.add(member));
    } else {
      this.teamMembers.add(teamMember);
    }
    return this;
  }

  /**
   * @description Allows users to add a new user type to the project
   * @param params UserTypeParams
   * @returns
   */
  public addUserType(userType: UserType | UserType[]): Project {
    if (Array.isArray(userType)) {
      userType.forEach((u) => this.userTypes.add(u));
    } else {
      this.userTypes.add(userType);
    }
    return this;
  }

  public outputStories(
    type: 'csv' | 'json' = 'json',
  ): string | undefined | { id: string | undefined; summary: string | undefined }[] {
    const csvJson: { id: string; summary: string | undefined; tasks: Task[] }[] = [];

    this.stories.forEach((story) => {
      csvJson.push({
        id: story.id,
        summary: story.summary,
        tasks: Array.from(story.tasks),
      });
    });

    if (type === 'csv') {
      const csv = json2csv.parse(csvJson, { fields: ['id', 'summary', 'tasks'] });
      console.log(csv);
      return csv;
    }

    return csvJson;
  }

  public addEpic(epic: Epic | Epic[]): Project {
    if (Array.isArray(epic)) {
      epic.forEach((e) => this._addEpicToProject(e));
    } else {
      this._addEpicToProject(epic);
    }
    return this;
  }

  public output(): ProjectOutput {
    const stories: UserStoryOutput[] = [];
    this.stories.forEach((story) => stories.push(story.output()));

    const userTypes: UserTypeOutput[] = [];
    this.userTypes.forEach((type) => userTypes.push(type.output()));

    const epics: EpicOutput[] = [];
    this.epics.forEach((epic) => epics.push(epic.output()));

    const departments: DepartmentOut[] = [];
    this.departments.forEach((department) => departments.push(department.output()));

    const sprints: SprintOut[] = [];
    this.sprints.forEach((sprint) => sprints.push(sprint.output()));

    const platforms: PlatformOut[] = [];
    this.platforms.forEach((platform) => platforms.push(platform.output()));

    const milestones: MilestoneOutput[] = [];
    this.milestones.forEach((milestone) => milestones.push(milestone.output()));

    const teamMembers: TeamMemberOutput[] = [];
    this.teamMembers.forEach((member) => teamMembers.push(member.output()));

    return {
      id: this.id,
      key: this.key,
      name: this.name,
      description: this.description,
      milestones: milestones,
      stories: stories,
      userTypes: userTypes,
      departments: departments,
      platforms: platforms,
      epics: epics,
      sprints: sprints,
      teamMembers: teamMembers,
      models: Array.from(this.models ?? []).map((model) => model.output()),
      totalStories: this.stories.size,
      totalDepartments: this.departments.size,
      totalPlatforms: this.platforms.size,
      totalEpics: this.epics.size,
      totalUserTypes: this.userTypes.size,
      totalSprints: this.sprints.size,
      totalMilestones: this.milestones.size,
      totalTeamMembers: this.teamMembers.size,
    };
  }
}
