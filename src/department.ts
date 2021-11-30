import uniqid from 'uniqid';
import Meta from './Meta';

type DepartmentParams = {
  name: string;
  description?: string;
};

export type DepartmentOut = {
  id: string;
} & DepartmentParams;

/**
 * A Department is an internal team that may be involved in the project.
 *
 * @example
 *```typescript
 * new Department({name: "Developers", description: "The developers of the project"});
 *
 * new Department().setName("Developers").setDescription("The developers of the project");
 *```
 *
 * @author Mike Rudge
 * @date 27/11/2021
 * @export {Department}
 * @class Department
 */
export default class Department implements Meta {
  public id: string;
  public name: string;
  public description: string;

  constructor(params?: DepartmentParams) {
    this.name = params?.name ?? '';
    this.description = params?.description ?? '';
    this.id = uniqid();
  }

  /**
   * @description Sets the name of the departments e.g Dev, Design
   * @author Mike Rudge
   * @date 27/11/2021
   * @param {string} name
   * @returns {Department}
   * @memberof Department
   */
  public setName(name: string): Department {
    this.name = name;
    return this;
  }

  public setDescription(description: string): Department {
    this.description = description;
    return this;
  }

  /**
   * @description outputs the departments to JSON
   * @author Mike Rudge
   * @date 27/11/2021
   * @returns {*}  {DepartmentOut}
   * @memberof Department
   */
  public output(): DepartmentOut {
    return this.toJSON();
  }

  public toJSON(): DepartmentOut {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }
}
