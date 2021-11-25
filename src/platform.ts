import uniqid from 'uniqid';

export type PlatformProps = {
  name: string;
};

export type PlatformOut = {
  id: string;
} & PlatformProps;

export default class Platform {
  name: string;
  id: string;

  constructor(props?: PlatformProps) {
    this.name = props?.name ?? '';
    this.id = uniqid();
  }

  public setName(name: string): Platform {
    this.name = name;
    return this;
  }

  private toJSON(): PlatformOut {
    return {
      id: this.id,
      name: this.name,
    };
  }

  public output(): PlatformOut {
    return this.toJSON();
  }
}
