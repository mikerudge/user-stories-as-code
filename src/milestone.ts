import uniqid from 'uniqid';
import Meta from './Meta';

type MilestoneParams = {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
};

export type MilestoneOutput = {
  id: string;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};

/**
 * @remarks
 *
 * Milestones that are added to an `Epic` will automatically be added to the project
 * as well so there is no need to add the milestones
 * to both a project AND an epic, just add it to the epic.
 *
 * @example
 *```ts
 * const milestone = new Milestone({ startDate: new Date(), endDate: new Date(), name: 'Finish the goal' });
 * const epic = new Epic({ ..., milestone }).addMilestone(milestone);
 *
 * // Or you can add milestones directly to the project.
 * const project = new Project({ ... }).addMilestone(milestone);
 *```
 * @author Mike Rudge
 * @date 27/11/2021
 * @export
 * @class Milestone
 */
export default class Milestone implements Meta {
  id: string;
  name: string;
  description: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  constructor(params?: MilestoneParams) {
    this.id = uniqid();
    this.name = params?.name ?? '';
    this.description = params?.description ?? '';
    this.startDate = params?.startDate;
    this.endDate = params?.endDate;
  }

  public setName(name: string): Milestone {
    this.name = name;
    return this;
  }

  public setDescription(description: string): Milestone {
    this.description = description;
    return this;
  }

  public setStartDate(startDate: Date): Milestone {
    this.startDate = startDate;
    return this;
  }

  public setEndDate(endDate: Date): Milestone {
    this.endDate = endDate;
    return this;
  }

  private toJSON(): MilestoneOutput {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      startDate: this.startDate?.toISOString() ?? undefined,
      endDate: this.endDate?.toISOString() ?? undefined,
    };
  }

  public output(): MilestoneOutput {
    return this.toJSON();
  }
}
