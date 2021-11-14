import uniqid from 'uniqid';

type MilestoneParams = {
  name?: string;
  startDate?: Date;
  endDate?: Date;
};

export type MilestoneOutput = {
  id: string;
  name?: string;
  startDate?: string;
  endDate?: string;
};

export default class Milestone {
  id: string;
  name: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  constructor(params: MilestoneParams) {
    this.id = uniqid();
    this.name = params.name;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
  }

  setName = (name: string): Milestone => {
    this.name = name;
    return this;
  };

  setStartDate = (startDate: Date): Milestone => {
    this.startDate = startDate;
    return this;
  };

  setEndDate = (endDate: Date): Milestone => {
    this.endDate = endDate;
    return this;
  };

  toJSON = (): MilestoneOutput => {
    return {
      id: this.id,
      name: this.name,
      startDate: this.startDate?.toISOString() ?? undefined,
      endDate: this.endDate?.toISOString() ?? undefined,
    };
  };

  output = (): MilestoneOutput => {
    return this.toJSON();
  };
}
