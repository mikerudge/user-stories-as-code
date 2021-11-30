import uniqid from 'uniqid';
import AcceptanceCriteria from './acceptanceCriteria';

import Department, { DepartmentOut } from './department';
import Epic, { EpicOutput } from './epic';
import Platform, { PlatformOut } from './platform';
import Sprint from './sprint';
import Task, { TaskOut } from './task';
import TeamMember from './teamMember';
import UserType, { UserTypeOutput } from './userType';

export type UserStoryParams = {
  iWant?: string;
  asA?: UserType;
  soICan?: string;
  platform?: Platform;
  dueDate?: Date;
  labels?: string[];
  description?: string;
  epic?: Epic;
  departments?: Department[];
  sprint?: Sprint;
  points?: number;
  key?: string;
  assignee?: TeamMember[];
  tasks?: Task[];
  acceptanceCriteria?: AcceptanceCriteria;
};
export type UserStoryOutput = {
  id: string;
  summary: string;
  tasks?: TaskOut[];
  platform?: PlatformOut;
  asA: string;
  departments?: DepartmentOut[];
  userType: UserTypeOutput | undefined;
  epic?: EpicOutput;
  acceptanceCriteria: string;
  labels: string[];
} & Omit<UserStoryParams, 'asA' | 'tasks' | 'platform' | 'departments' | 'epic' | 'acceptanceCriteria' | 'labels'>;

/**
 * The UserStory class represents a user story and all of its properties. The `summary` property is the constructed user story string.
 *
 * The user story is made up of three main properties: `asA`, `iWant`, and `soICan`.
 *
 * @example
 *```ts
 * const author = new UserType({...})
 * const userStory = new UserStory({asA: author, iWant: 'To be able to do something', soICan: 'Do that'});
 * const project = new Project({...}).addStory(userStory)
 *```
 * @example - Full Example
 *```ts
 * new UserStory({
 * asA: admin,
 * iWant: 'To be able to do something',
 * soICan: 'Do that',
 * key: 'key', // this will be automatically set from the project name if not explicitly set
 * description: 'This is a description',
 * points: 1,
 * labels: ['label1', 'label2'],
 * dueDate: new Date(),
 * acceptanceCriteria: new AcceptanceCriteria({...}),
 * sprint: new Sprint({...}),
 * platform: new Platform({...}),
 * epic: new Epic({...}),
 * departments: [new Department({...}), new Department({...})],
 * assignee: [new TeamMember({...}), new TeamMember({...})],
 * tasks: [new Task({...}), new Task({...})]
 * })
 *```
 * @see {@link Project}
 *
 * @author Mike Rudge
 * @date 28/11/2021
 * @export
 * @class UserStory
 */
export default class UserStory {
  public readonly id: string = uniqid();
  public iWant: string;
  public asA: UserType | undefined;
  public soICan: string | undefined;
  public labels: Set<string> | undefined;
  public dueDate: Date | undefined;
  public summary: string | undefined;
  public platform: Platform | undefined;
  public description: string | undefined;
  public tasks: Set<Task>;
  public epic: Epic | undefined;
  public departments: Set<Department>;
  public sprint: Sprint | undefined;
  public points: number;
  public key: string;
  public assignee: Set<TeamMember>;
  public acceptanceCriteria?: AcceptanceCriteria;

  constructor(public params?: UserStoryParams) {
    this.points = params?.points ?? 0;
    this.iWant = params?.iWant ?? 'New User Story';
    this.asA = params?.asA;
    this.soICan = params?.soICan ?? '';
    this.description = params?.description;
    this.labels = new Set(params?.labels);
    this.platform = params?.platform;
    this.dueDate = params?.dueDate;
    this.tasks = new Set(params?.tasks);
    this.epic = params?.epic;
    this.departments = new Set(params?.departments);
    this.summary = this._generateSummary();
    this.sprint = params?.sprint;
    this.key = params?.key ?? '';
    this.assignee = new Set(params?.assignee);
    this.acceptanceCriteria = params?.acceptanceCriteria;
  }

  public setAcceptanceCriteria(acceptanceCriteria: AcceptanceCriteria): UserStory {
    this.acceptanceCriteria = acceptanceCriteria;
    return this;
  }

  public addLabel(label: string | string[]): UserStory {
    if (typeof label === 'string') {
      this.labels?.add(label);
    } else {
      label.forEach((l) => this.labels?.add(l));
    }
    return this;
  }

  public setDueDate(date: Date): UserStory {
    this.dueDate = date;
    return this;
  }

  public setKey(key: string): UserStory {
    this.key = key;
    return this;
  }

  public setPoints(points: number): UserStory {
    this.points = points;
    return this;
  }

  public addAssignee(assignee: TeamMember | TeamMember[]): UserStory {
    if (Array.isArray(assignee)) {
      assignee.forEach((member) => this?.assignee?.add(member));
    } else {
      this.assignee?.add(assignee);
    }
    return this;
  }

  public setAsA(who: UserType): UserStory {
    this.asA = who;
    this._generateSummary();
    return this;
  }

  public setIWant(what: string): UserStory {
    this.iWant = what;
    this._generateSummary();

    return this;
  }

  public setSoICan(why: string): UserStory {
    this.soICan = why;
    this._generateSummary();

    return this;
  }

  public setPlatform(platform: Platform): UserStory {
    this.platform = platform;
    return this;
  }

  public setSprint(sprint: Sprint): UserStory {
    this.sprint = sprint;
    return this;
  }

  public setEpic(epic: Epic): UserStory {
    this.epic = epic;
    return this;
  }

  /**
   * @description
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {Task} task
   * @memberof UserStory
   */
  public addTask(task: Task | Task[]): UserStory {
    if (Array.isArray(task)) {
      task.forEach((task) => this.tasks.add(task));
    } else {
      this.tasks?.add(task);
    }

    return this;
  }

  public addDepartment(department: Department | Department[]): UserStory {
    if (Array.isArray(department)) {
      department.forEach((d) => this.departments.add(d));
    } else {
      this.departments.add(department);
    }

    return this;
  }

  // Capitalise the first letter of a string
  private readonly _capitalise = (input: string): string => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  private readonly _generateSummary = (): string => {
    this.summary = '';

    if (this.asA?.name) {
      this.summary += `As a ${this.asA.name}`;
    }

    if (this.iWant) {
      this.summary += `, I want ${this.iWant}`;
    }

    if (this.soICan) {
      this.summary += `, so I can ${this.soICan}`;
    }

    this.summary = this._capitalise(this.summary);
    return this.summary;
  };

  public toJSON(): UserStoryOutput {
    this._generateSummary();

    const out: UserStoryOutput = {
      id: this.id.toString(),
      epic: this.epic?.output(),
      key: this.key,
      summary: this.summary?.toString() ?? '',
      description: this.description?.toString() ?? '',
      acceptanceCriteria: this.acceptanceCriteria?.generate() ?? '',
      userType: this.asA?.toJSON(),
      asA: this.asA?.name ?? '',
      iWant: this.iWant?.toString(),
      soICan: this.soICan?.toString(),
      platform: this.platform?.output(),
      dueDate: this.dueDate,
      sprint: this.sprint,
      points: this.points,
      labels: Array.from(this.labels ?? ['']),
      tasks: Array.from(this.tasks).map((task) => task.output()) ?? [],
      departments: Array.from(this.departments).map((department) => department.output()) ?? [],
    };

    return out;
  }

  public output(): UserStoryOutput {
    if (!this.iWant) {
      throw new Error('No user type specified');
    }

    if (!this.asA) {
      throw new Error('No what specified');
    }

    return this.toJSON();

    // return this.summary;
  }
}
