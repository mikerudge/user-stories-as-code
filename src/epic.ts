import uniqid from 'uniqid';

import Milestone, { MilestoneOutput } from './milestone';

type EpicProps = {
  name?: string;
  description?: string;
  color?: string;
  milestone?: Milestone;
};

export type EpicOutput = {
  id: string;
  milestone: MilestoneOutput | undefined;
} & Omit<EpicProps, 'milestone'>;

export default class Epic {
  id: string;
  name: string;
  description: string;
  color: string;
  milestone: Milestone | undefined;

  constructor(public params?: EpicProps) {
    this.id = uniqid();
    this.name = params?.name ?? '';
    this.description = params?.description ?? '';
    this.color = params?.color ?? '';
    this.milestone = params?.milestone;
  }

  /**
   * @description set the name of the epic
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {string} name
   * @memberof Epic
   */
  setName = (name: string): Epic => {
    this.name = name;
    return this;
  };

  setMilestone = (milestone: Milestone): Epic => {
    this.milestone = milestone;
    return this;
  };

  /**
   * @description
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {string} description
   * @memberof Epic
   */
  setDescription = (description: string): Epic => {
    this.description = description;
    return this;
  };

  setColor = (color: string): Epic => {
    this.color = color;

    return this;
  };

  addMilestone = (milestone: Milestone): Epic => {
    this.milestone = milestone;
    return this;
  };

  toJSON = (): EpicOutput => {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      color: this.color,
      milestone: this.milestone?.output(),
    };
  };

  output = (): EpicOutput => {
    return this.toJSON();
  };
}
