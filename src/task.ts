import uniqid from 'uniqid';

import TeamMember, { TeamMemberOutput } from './teamMember';
import UserStory from './userStory';

export type TaskParams = {
  title: string;
  description?: string;
  priority?: number;
  status?: string;
  assignee?: TeamMember[];
};

export type TaskOut = {
  id: string;
  assignee?: TeamMemberOutput[];
} & Omit<TaskParams, 'assignee'>;

/**
 * A task is for when the format of a user story doesn't make sense.
 * For example you might have a task on the project for setting up the GitHub repo.
 *
 * @example
 *```ts
 * const task = new Task({
 * title: 'Create GitHub repo',
 * description: 'Set a repo on the company GitHub account called...',
 * status: 'TODO',
 * priority: 2,
 * assignee: [james],
 *  });
 *```
 * @see - {@link Project}
 * @see - {@link UserStory}
 *
 * @author Mike Rudge
 * @date 28/11/2021
 * @export
 * @class Task
 */
export default class Task {
  id: string;
  title: string;
  description: string | undefined;
  priority: number | undefined;
  status: string | undefined;
  assignee: Set<TeamMember>;
  constructor(params?: TaskParams) {
    this.id = uniqid();
    this.title = params?.title ?? '';
    this.priority = params?.priority;
    this.status = params?.status;
    this.assignee = new Set(params?.assignee);
  }

  setTitle(title: string): Task {
    this.title = title;
    return this;
  }

  setStatus(status: string): Task {
    this.status = status;
    return this;
  }

  setPriority(priority: number): Task {
    this.priority = priority;
    return this;
  }

  setDescription(description: string): Task {
    this.description = description;
    return this;
  }

  addAssignee(assignee: TeamMember | TeamMember[]): Task {
    if (Array.isArray(assignee)) {
      assignee.forEach((member) => this?.assignee?.add(member));
    } else {
      this.assignee?.add(assignee);
    }
    return this;
  }

  addUserStory(userStory: UserStory | UserStory[]): Task {
    if (Array.isArray(userStory)) {
      userStory.forEach((story) => {
        story.addTask(this);
      });
    } else {
      userStory.addTask(this);
    }
    return this;
  }

  output(): TaskOut {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
      status: this.status,
      assignee: Array.from(this.assignee).map((member) => member.output()),
    };
  }
}
