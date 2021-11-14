import uniqid from 'uniqid';
import TeamMember from './teamMember';
import UserStory from './userStory';

export type TaskProps = {
  title: string;
  description?: string;
  priority?: number;
  status?: string;
  assignee?: TeamMember[];
};

export default class Task {
  id: string;
  title: string;
  description: string | undefined;
  priority: number | undefined;
  status: string | undefined;
  assignee: Set<TeamMember>;
  constructor(props?: TaskProps) {
    this.id = uniqid();
    this.title = props?.title ?? '';
    this.priority = props?.priority;
    this.status = props?.status;
    this.assignee = new Set(props?.assignee);
  }

  setTitle = (title: string): Task => {
    this.title = title;
    return this;
  };

  setStatus = (status: string): Task => {
    this.status = status;
    return this;
  };

  setPriority = (priority: number): Task => {
    this.priority = priority;
    return this;
  };

  setDescription = (description: string): Task => {
    this.description = description;
    return this;
  };

  setAssignee = (assignee: TeamMember | TeamMember[]): Task => {
    if (Array.isArray(assignee)) {
      assignee.forEach((member) => this?.assignee?.add(member));
    } else {
      this.assignee?.add(assignee);
    }
    return this;
  };

  setUserStory = (userStory: UserStory | UserStory[]): Task => {
    if (Array.isArray(userStory)) {
      userStory.forEach((story) => {
        story.addTask(this);
      });
    } else {
      userStory.addTask(this);
    }
    return this;
  };

  create = () => {
    return { id: this.id, title: this.title };
  };
}
