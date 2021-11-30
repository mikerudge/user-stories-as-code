type MetaParams = {
  name: string;
  description: string;
};
export default class Meta {
  name: string;
  description: string;

  constructor(params?: MetaParams) {
    this.name = params?.name ?? '';
    this.description = params?.description ?? '';
  }

  setName(name: string): Meta {
    this.name = name;
    return this;
  }

  setDescription(description: string): Meta {
    this.description = description;
    return this;
  }
}
