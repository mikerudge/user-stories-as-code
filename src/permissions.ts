import uniqid from 'uniqid';
import UserType from './userType';

export type Action = 'create' | 'read' | 'update' | 'delete' | 'all' | 'deny';

export type PermissionProps = {
  actions: Action | Action[] | null;
  condition?: 'owner';
  userType: UserType;
  can?: boolean;
};
export default class Permission {
  public readonly id: string;
  public userType: UserType;
  public condition: null | 'owner' | undefined;
  public actions: Action | Action[] | null;
  public can: boolean;
  constructor(props: PermissionProps) {
    this.id = uniqid();
    this.userType = props.userType;
    this.condition = props.condition;
    this.actions = props.actions;
    this.can = props.can ?? true;
  }

  setUserType = (userType: UserType): Permission => {
    this.userType = userType;
    return this;
  };

  setCondition = (condition: null | 'owner' | undefined): Permission => {
    this.condition = condition;
    return this;
  };

  setCan = (can: boolean): Permission => {
    this.can = can;
    return this;
  };

  readonly setactions = (actions: Action | Action[] | null): Permission => {
    if (Array.isArray(actions)) {
      this.actions = actions;
    } else if (typeof actions === 'string') {
      this.actions = [actions];
    }
    return this;
  };
}
