import uniqid from 'uniqid';

type Props = {
  id?: string;
  name: string;
  role?: string;
  avatar?: string;
};

export type TeamMemberOutput = {
  id: string;
} & Props;

export default class TeamMember {
  id: string;
  name: string;
  role: string | undefined;
  avatar: string | undefined;
  constructor(props: Props) {
    this.id = props.id ?? uniqid();
    this.name = props.name;
    this.role = props.role;
    this.avatar = props.avatar;
  }

  public setName = (name: string): TeamMember => {
    this.name = name;
    return this;
  };

  public setRole = (role: string): TeamMember => {
    this.role = role;
    return this;
  };

  public setAvatar = (avatar: string): TeamMember => {
    this.avatar = avatar;
    return this;
  };

  public setId = (id: string): TeamMember => {
    this.id = id;
    return this;
  };

  toJSON(): TeamMemberOutput {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      avatar: this.avatar,
    };
  }

  output = (): TeamMemberOutput => {
    return this.toJSON();
  };
}
