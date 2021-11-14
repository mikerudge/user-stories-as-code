import { Platform } from './platforms';
import Task from './task';
import UserType, { UserTypeOutput } from './userType';
import uniqid from 'uniqid';
import { Epic } from './epic';
import Department from './department';
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
  tasks?: Task[];
  asA: string;
  userType: UserTypeOutput;
} & Omit<UserStoryProps, 'asA'>;

export default class UserStory {
  readonly id: string;
  public iWant: string;
  public asA: UserType | undefined;
  public soICan: string | undefined;
  public labels: string[] | undefined;
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
    this.labels = props?.labels;
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

  public setKey = (key: string): UserStory => {
    this.key = key;
    return this;
  };

  public setPoints = (points: number): UserStory => {
    this.points = points;
    return this;
  };

  public setAssignee = (assignee: TeamMember | TeamMember[]): UserStory => {
    if (Array.isArray(assignee)) {
      assignee.forEach((member) => this?.assignee?.add(member));
    } else {
      this.assignee?.add(assignee);
    }
    return this;
  };

  public setAsA = (who: UserType): UserStory => {
    this.asA = who;
    this._generateSummary();
    return this;
  };

  public setIWant = (what: string): UserStory => {
    this.iWant = what;
    this._generateSummary();

    return this;
  };

  public setSoThat = (why: string): UserStory => {
    this.soICan = why;
    this._generateSummary();

    return this;
  };

  public setPlatform = (platform: Platform): UserStory => {
    this.platform = platform;
    return this;
  };

  public readonly setSprint = (sprint: Sprint): UserStory => {
    this.sprint = sprint;
    return this;
  };

  addEpic = (epic: Epic): UserStory => {
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
  public addTask = (task: Task | Task[]): UserStory => {
    if (Array.isArray(task)) {
      task.forEach((task) => this.tasks.add(task));
    } else {
      this.tasks?.add(task);
    }

    return this;
  };

  /**
   * @description
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {Task[]} tasks
   * @memberof UserStory
   */
  public addManyTasks = (tasks: Task[]): UserStory => {
    tasks.forEach((task) => {
      this.addTask(task);
    });
    return this;
  };

  public addDepartment = (department: Department): UserStory => {
    this.departments.add(department);

    return this;
  };

  public addManyDepartments = (departments: Department[]): UserStory => {
    departments.forEach((department) => {
      this.addDepartment(department);
    });
    return this;
  };

  // Capitalise the first letter of a string
  private _capitalise = (input: string): string => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  private _generateSummary = (): string => {
    this.summary = '';

    if (this.asA?.name) {
      this.summary += `As a ${this.asA.name}`;
    }

    if (this.iWant) {
      this.summary += `, I want to ${this.iWant}`;
    }

    if (this.soICan) {
      this.summary += `, so I can ${this.soICan}`;
    }

    this.summary = this._capitalise(this.summary);
    return this.summary;
  };

  public create = (): UserStoryOutput => {
    if (!this.iWant) {
      throw new Error('No user type specified');
    }

    if (!this.asA) {
      throw new Error('No what specified');
    }
    this._generateSummary();

    const out: UserStoryOutput = {
      id: this.id.toString(),
      key: this.key,
      summary: this.summary?.toString() ?? '',
      description: this.description?.toString() ?? '',
      userType: this.asA.toJSON(),
      asA: this.asA.name,
      iWant: this.iWant?.toString(),
      soICan: this.soICan?.toString(),
      platform: this.platform,
      dueDate: this.dueDate,
      labels: this.labels,
      sprint: this.sprint,
      tasks: Array.from(this.tasks) ?? [],
      points: this.points,
    };

    return out;
    // return this.summary;
  };
}
