import uniqid from 'uniqid';

type DepartmentProps = {
  name: string;
};

export type DepartmentOut = {
  id: string;
} & DepartmentProps;

export default class Department {
  public id: string;
  public name: string;

  constructor(props?: DepartmentProps) {
    this.name = props?.name ?? '';
    this.id = uniqid();
  }

  public setName(name: string): Department {
    this.name = name;
    return this;
  }

  public output(): DepartmentOut {
    return this.toJSON();
  }

  public toJSON(): DepartmentOut {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
