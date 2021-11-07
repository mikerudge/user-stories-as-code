export type PlatformProps = {
  title: string;
};

export class Platform {
  title: string;

  constructor(props?: PlatformProps) {
    this.title = props?.title ?? '';
  }

  setTitle = (title: string): Platform => {
    this.title = title;
    return this;
  };
}
