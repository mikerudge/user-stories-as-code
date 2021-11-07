type DepartmentProps = {
  name: string;
};

export default class Department {
  name: string;
  constructor(props: DepartmentProps) {
    this.name = props.name;
  }

  getName = (): string => {
    return this.name;
  };

  setName = (name: string): Department => {
    this.name = name;
    return this;
  };

  create = (): string => {
    return this.name;
  };
}
