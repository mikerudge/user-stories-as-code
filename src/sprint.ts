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

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getStartDate(): Date {
    return this.startDate;
  }

  setName(name: string): Sprint {
    this.name = name;
    return this;
  }

  setStartDate(startDate: Date): Sprint {
    this.startDate = startDate;
    return this;
  }

  setEndDate(endDate: Date): Sprint {
    this.endDate = endDate;
    return this;
  }

  output = (): SprintOut => {
    return {
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  };
}
