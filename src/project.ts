import json2csv from 'json2csv';
import uniqid from 'uniqid';

import Department, { DepartmentOut } from './department';
import { Epic, EpicOutput } from './epic';
import Milestone, { MilestoneOutput } from './milestone';
import { Model, ModelOutput } from './model';
import { Platform, PlatformOut } from './platforms';
import Sprint, { SprintOut } from './sprint';
import Task from './task';
import TeamMember, { TeamMemberOutput } from './teamMember';
import UserStory, { UserStoryOutput } from './userStory';
import UserType, { UserTypeOutput } from './userType';

export type ProjectOptions = {
  defaultPoints?: number;
};
export type ProjectProps = {
  name: string;
  key?: string;
  userTypes?: UserType[];
  owner?: TeamMember;
  stories?: UserStory[];
  models?: Model[];
  sprints?: Sprint[];
  epics?: Epic[];
  departments?: Department[];
  milestones?: Milestone[];
  teamMembers?: TeamMember[];
  tasks?: Task[];
  options?: ProjectOptions;
  platforms?: Platform[];
};

export type ProjectOutput = {
  id: string;
  name: string;
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

export default class Project {
  public readonly id: string;
  public readonly name: string = '';
  public owner: TeamMember | undefined;
  public platforms: Set<Platform> = new Set();
  public sprints: Set<Sprint> = new Set();
  public stories: Set<UserStory>;
  public tasks: Set<Task>;
  public teamMembers: Set<TeamMember>;
  public userTypes: Set<UserType> = new Set();
  public models: Set<Model>;
  public defaultPoints: number;
  public departments: Set<Department> = new Set();
  public epics: Set<Epic> = new Set();
  public key: string;
  public milestones: Set<Milestone>;

  constructor(props: ProjectProps, options: ProjectOptions = {}) {
    this.id = uniqid();
    this.name = props.name;
    this.userTypes = new Set(props.userTypes);
    this.stories = new Set(props.stories);
    this.milestones = new Set(props.milestones);
    this.key = props.key || props.name.slice(0, 3).toUpperCase();
    this.teamMembers = new Set(props.teamMembers);
    this.owner = props.owner;
    this.tasks = new Set(props.tasks);
    this.defaultPoints = options.defaultPoints || 0;
    this.departments = new Set(props.departments);
    this.platforms = new Set(props.platforms);
    this.sprints = new Set(props.sprints);
    this.epics = new Set(props.epics);
    this.models = new Set(props.models);
  }

  public readonly addModel = (model: Model | Model[]): Project => {
    if (Array.isArray(model)) {
      model.forEach((m) => this.models.add(m));
    } else {
      this.models.add(model);
    }
    return this;
  };

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

  private generateOutput = (): string => {
    return JSON.stringify(this.stories, null, 2);
  };

  public readonly addSprint = (sprint: Sprint | Sprint[]): Project => {
    if (Array.isArray(sprint)) {
      sprint.forEach((s) => this.addSprint(s));
    } else {
      this.sprints.add(sprint);
    }

    return this;
  };

  /**
   * @description Allows users to add a new department to the project
   * @param name
   * @returns
   */
  public readonly addDepartment = (department: Department | Department[]): Project => {
    if (Array.isArray(department)) {
      department.forEach((d) => this.departments.add(d));
    } else {
      this.departments.add(department);
    }
    return this;
  };

  public readonly setKey = (key: string): Project => {
    this.key = key;
    return this;
  };

  /**
   * @description add milestone to project
   * @author Mike Rudge
   * @date 16/11/2021
   * @param {(Milestone | Milestone[])} milestone
   * @memberof Project
   */
  public readonly addMilestone = (milestone: Milestone | Milestone[]): Project => {
    if (Array.isArray(milestone)) {
      milestone.forEach((m) => this.milestones.add(m));
    } else {
      this.milestones.add(milestone);
    }
    return this;
  };

  public readonly setOwner = (owner: TeamMember): Project => {
    this.owner = owner;

    return this;
  };

  /**
   * @description add a platform to the project
   * @author Mike Rudge
   * @date 07/11/2021
   * @param {Platform} platform
   * @memberof Project
   */
  public readonly addPlatform = (platform: Platform | Platform[]): Project => {
    if (Array.isArray(platform)) {
      platform.forEach((p) => this.platforms.add(p));
    } else {
      this.platforms.add(platform);
    }
    return this;
  };

  /**
   * @description a simple alias for addStory
   * @author Mike Rudge
   * @date 14/11/2021
   * @param {UserStory[]} stories
   * @memberof Project
   */
  public readonly addStories = (stories: UserStory[]): Project => {
    stories.forEach((story) => this.addStory(story));
    return this;
  };

  /**
   * @description Adds a new user story to the project
   * @param {UserStory | UserStory[]} story
   * @returns {Project} project
   */
  public readonly addStory = (story: UserStory | UserStory[]): Project => {
    if (Array.isArray(story)) {
      story.forEach((s) => this._addStoryToProject(s));
    } else {
      this._addStoryToProject(story);
    }

    return this;
  };

  public readonly addTask = (tasks: Task | Task[]): Project => {
    if (Array.isArray(tasks)) {
      tasks.forEach((task) => {
        this.tasks.add(task);
      });
    } else {
      this.tasks.add(tasks);
    }

    return this;
  };

  public readonly addTeamMember = (teamMember: TeamMember | TeamMember[]): Project => {
    if (Array.isArray(teamMember)) {
      teamMember.forEach((member) => this.teamMembers.add(member));
    } else {
      this.teamMembers.add(teamMember);
    }
    return this;
  };

  /**
   * @description Allows users to add a new user type to the project
   * @param params UserTypeProps
   * @returns
   */
  public readonly addUserType = (userType: UserType | UserType[]): Project => {
    if (Array.isArray(userType)) {
      userType.forEach((u) => this.userTypes.add(u));
    } else {
      this.userTypes.add(userType);
    }
    return this;
  };

  public readonly outputStories = (
    type: 'csv' | 'json' = 'json',
  ): string | undefined | { id: string | undefined; summary: string | undefined }[] => {
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
  };

  public addEpic = (epic: Epic | Epic[]): Project => {
    if (Array.isArray(epic)) {
      epic.forEach((e) => this._addEpicToProject(e));
    } else {
      this._addEpicToProject(epic);
    }
    return this;
  };

  public readonly output = (): ProjectOutput => {
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
  };
}
