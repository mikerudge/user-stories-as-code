import { Platform, PlatformOut } from './platforms';
import Task, { TaskOut } from './task';
import UserType, { UserTypeOutput } from './userType';
import uniqid from 'uniqid';
import { Epic } from './epic';
import Department, { DepartmentOut } from './department';
import Sprint from './sprint';
import TeamMember from './teamMember';

export type UserStoryProps = {
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
};
export type UserStoryOutput = {
  id: string;
  summary: string;
  tasks?: TaskOut[];
  platform?: PlatformOut;
  asA: string;
  departments?: DepartmentOut[];
  userType: UserTypeOutput | undefined;
} & Omit<UserStoryProps, 'asA' | 'tasks' | 'platform' | 'departments'>;

export default class UserStory {
  readonly id: string;
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

  constructor(public props?: UserStoryProps) {
    this.id = uniqid();
    this.points = props?.points ?? 0;
    this.iWant = props?.iWant ?? 'New User Story';
    this.asA = props?.asA;
    this.soICan = props?.soICan ?? '';
    this.description = props?.description;
    this.labels = new Set(props?.labels);
    this.platform = props?.platform;
    this.dueDate = props?.dueDate;
    this.tasks = new Set(props?.tasks);
    this.epic = props?.epic;
    this.departments = new Set(props?.departments);
    this.summary = this._generateSummary();
    this.sprint = props?.sprint;
    this.key = props?.key ?? '';
    this.assignee = new Set(props?.assignee);
  }

  public readonly addLabel = (label: string | string[]): UserStory => {
    if (typeof label === 'string') {
      this.labels?.add(label);
    } else {
      label.forEach((l) => this.labels?.add(l));
    }
    return this;
  };

  public readonly setDueDate = (date: Date): UserStory => {
    this.dueDate = date;
    return this;
  };

  public readonly setKey = (key: string): UserStory => {
    this.key = key;
    return this;
  };

  public readonly setPoints = (points: number): UserStory => {
    this.points = points;
    return this;
  };

  public readonly addAssignee = (assignee: TeamMember | TeamMember[]): UserStory => {
    if (Array.isArray(assignee)) {
      assignee.forEach((member) => this?.assignee?.add(member));
    } else {
      this.assignee?.add(assignee);
    }
    return this;
  };

  public readonly setAsA = (who: UserType): UserStory => {
    this.asA = who;
    this._generateSummary();
    return this;
  };

  public setIWant = (what: string): UserStory => {
    this.iWant = what;
    this._generateSummary();

    return this;
  };

  public readonly setSoICan = (why: string): UserStory => {
    this.soICan = why;
    this._generateSummary();

    return this;
  };

  public readonly setPlatform = (platform: Platform): UserStory => {
    this.platform = platform;
    return this;
  };

  public readonly setSprint = (sprint: Sprint): UserStory => {
    this.sprint = sprint;
    return this;
  };

  public readonly setEpic = (epic: Epic): UserStory => {
    this.epic = epic;
    return this;
  };

  /**
   * @description
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {Task} task
   * @memberof UserStory
   */
  public readonly addTask = (task: Task | Task[]): UserStory => {
    if (Array.isArray(task)) {
      task.forEach((task) => this.tasks.add(task));
    } else {
      this.tasks?.add(task);
    }

    return this;
  };

  public readonly addDepartment = (department: Department | Department[]): UserStory => {
    if (Array.isArray(department)) {
      department.forEach((d) => this.departments.add(d));
    } else {
      this.departments.add(department);
    }

    return this;
  };

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

  public readonly toJSON = (): UserStoryOutput => {
    this._generateSummary();

    const out: UserStoryOutput = {
      id: this.id.toString(),
      key: this.key,
      summary: this.summary?.toString() ?? '',
      description: this.description?.toString() ?? '',
      userType: this.asA?.output(),
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
  };

  public readonly output = (): UserStoryOutput => {
    if (!this.iWant) {
      throw new Error('No user type specified');
    }

    if (!this.asA) {
      throw new Error('No what specified');
    }

    return this.toJSON();

    // return this.summary;
  };
}
