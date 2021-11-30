import uniqid from 'uniqid';
import Meta from './Meta';

import Milestone, { MilestoneOutput } from './milestone';

type EpicParams = {
  name?: string;
  description?: string;
  color?: string;
  milestone?: Milestone;
};

export type EpicOutput = {
  id: string;
  milestone: MilestoneOutput | undefined;
} & Omit<EpicParams, 'milestone'>;

/**
 * Creating an epic allows you to group your user stories.
 *
 * @example
 *```ts
 * new Epic({ name: 'Authentication', description: "Authentication for all users", color: "blue",  milestone: new Milestone({...}) });
 *```
 * @remarks
 * Epics added to {@link UserStory} will automatically be added to the project as well.
 *
 * @author Mike Rudge
 * @date 27/11/2021
 * @class Epic
 */
export default class Epic implements Meta {
  id: string;
  name: string;
  description: string;
  color: string;
  milestone: Milestone | undefined;

  constructor(public params?: EpicParams) {
    this.id = uniqid();
    this.name = params?.name ?? '';
    this.description = params?.description ?? '';
    this.color = params?.color ?? '';
    if (params?.milestone) {
      this.setMilestone(params.milestone);
    }
  }

  /**
   * @description set the name of the epic
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {string} name
   * @memberof Epic
   */
  public setName(name: string): Epic {
    this.name = name;
    return this;
  }

  public setMilestone(milestone: Milestone): Epic {
    this.milestone = milestone;
    return this;
  }

  /**
   * @description
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {string} description
   * @memberof Epic
   */
  public setDescription(description: string): Epic {
    this.description = description;
    return this;
  }

  public setColor(color: string): Epic {
    this.color = color;

    return this;
  }

  public addMilestone(milestone: Milestone): Epic {
    this.milestone = milestone;
    return this;
  }

  private toJSON(): EpicOutput {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      color: this.color,
      milestone: this.milestone?.output(),
    };
  }

  public output(): EpicOutput {
    return this.toJSON();
  }
}
