import uniqid from 'uniqid';

type SprintParams = {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
};

export type SprintOut = {
  id: string;
} & SprintParams;

export default class Sprint {
  public id: string;
  public name: string;
  public startDate: Date;
  public endDate: Date;

  constructor(params?: SprintParams) {
    this.id = uniqid();
    this.name = params?.name ?? '';
    this.startDate = params?.startDate ?? new Date();
    this.endDate = params?.endDate ?? new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  public setName(name: string): Sprint {
    this.name = name;
    return this;
  }

  public setStartDate(startDate: Date): Sprint {
    this.startDate = startDate;
    return this;
  }

  public setEndDate(endDate: Date): Sprint {
    this.endDate = endDate;
    return this;
  }

  public output(): SprintOut {
    return {
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}
