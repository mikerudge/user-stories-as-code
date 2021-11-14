import uniqid from 'uniqid';

type DepartmentProps = {
  name: string;
};

export type DepartmentOut = {
  id: string;
} & DepartmentProps;

export default class Department {
  name: string;
  id: string;
  constructor(props: DepartmentProps) {
    this.name = props.name;
    this.id = uniqid();
  }

  getName = (): string => {
    return this.name;
  };

  setName = (name: string): Department => {
    this.name = name;
    return this;
  };

  toJSON(): DepartmentOut {
    return {
      id: this.id,
      name: this.name,
    };
  }

  output = (): DepartmentOut => {
    return this.toJSON();
  };
}
