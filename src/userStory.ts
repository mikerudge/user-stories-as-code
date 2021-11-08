import { Platform } from './platforms';
import Task from './task';
import UserType from './userType';
import uniqid from 'uniqid';
import { Epic } from './epic';
import Department from './department';
import Sprint from './sprint';

export type UserStoryProps = {
  iWant?: string;
  asA?: UserType;
  soICan?: string;
  points?: number;
  platform?: Platform;
  dueDate?: Date;
  labels?: string[];
  description?: string;
  epic?: Epic;
  departments?: Department[];
  sprint?: Sprint;
};
// A class that allows users to add new user stories
export default class UserStory {
  readonly id: string;
  iWant: string;
  asA: UserType | undefined;
  soICan: string | undefined;
  labels: string[] | undefined;
  dueDate: Date | undefined;
  public summary: string | undefined;
  public platform: Platform | undefined;
  public description: string | undefined;
  public tasks: Task[];
  public epic: Epic | undefined;
  public departments: Set<Department>;
  public sprint: Sprint | undefined;

  constructor(public props?: UserStoryProps) {
    this.iWant = props?.iWant ?? 'New User Story';
    this.asA = props?.asA;
    this.soICan = props?.soICan ?? '';
    this.description = props?.description;
    this.labels = props?.labels;
    this.platform = props?.platform;
    this.dueDate = props?.dueDate;
    this.tasks = [];
    this.id = uniqid();
    this.epic = props?.epic;
    this.departments = new Set(props?.departments);
    this.summary = this._generateSummary();
    this.sprint = props?.sprint;
  }

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
  public addTask = (task: Task): UserStory => {
    // Check to make sure task is not already added
    if (!this.tasks.includes(task)) {
      const taskWithStory = task.setUserStory(this);
      this.tasks?.push(taskWithStory);
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

  public create = (): string => {
    if (!this.iWant) {
      throw new Error('No user type specified');
    }

    if (!this.asA) {
      throw new Error('No what specified');
    }
    this._generateSummary();

    const out = {
      id: this.id.toString(),
      summary: this.summary?.toString(),
      userType: this.asA?.name ?? '',
    };

    return JSON.stringify(out);
    // return this.summary;
  };
}
