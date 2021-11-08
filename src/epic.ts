import uniqid from 'uniqid';

type EpicProps = {
  name: string;
  description?: string;
  color?: string;
};

export class Epic {
  id: string;
  name: string;
  description: string;
  color: string;

  constructor(public params?: EpicProps) {
    this.description = params?.description ?? '';
    this.name = params?.name ?? '';
    this.color = params?.color ?? '';
    this.id = uniqid();
  }

  /**
   * @description set the name of the epic
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {string} name
   * @memberof Epic
   */
  setName = (name: string): Epic => {
    this.name = name;
    return this;
  };

  /**
   * @description
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {string} description
   * @memberof Epic
   */
  setDescription = (description: string): Epic => {
    this.description = description;
    return this;
  };

  setColor = (color: string): Epic => {
    this.color = color;

    return this;
  };
}
