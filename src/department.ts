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

  public getName = (): string => {
    return this.name;
  };

  public output = (): DepartmentOut => {
    return this.toJSON();
  };

  public setName = (name: string): Department => {
    this.name = name;
    return this;
  };

  public toJSON(): DepartmentOut {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
