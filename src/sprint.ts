import uniqid from 'uniqid';
import Meta from './Meta';

type SprintParams = {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
};

export type SprintOut = {
  id: string;
} & SprintParams;

/**
 * A sprint is a period of time between a start date and an end date.
 * @author Mike Rudge
 * @date 28/11/2021
 * @export
 * @class Sprint
 */
export default class Sprint implements Meta {
  public id: string;
  public name: string;
  public startDate: Date;
  public endDate: Date;
  public description: string;

  constructor(params?: SprintParams) {
    this.id = uniqid();
    this.name = params?.name ?? '';
    this.startDate = params?.startDate ?? new Date();
    this.endDate = params?.endDate ?? new Date();
    this.description = params?.description ?? '';
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

  public setDescription(description: string): Sprint {
    this.description = description;
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
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}
