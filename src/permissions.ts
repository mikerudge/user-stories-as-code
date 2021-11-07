import uniqid from 'uniqid';
import UserType from './userType';

export type Action = 'create' | 'read' | 'update' | 'delete' | 'all' | 'deny';

export type PermissionProps = {
  actions?: Action[];
  condition?: 'owner';
  userType: UserType;
  can?: boolean;
};
export default class Permission {
  public readonly id: string;
  public userType: UserType;
  public condition: null | 'owner' | undefined;
  public actions: Set<Action>;
  public can: boolean;
  constructor(props: PermissionProps) {
    this.id = uniqid();
    this.userType = props.userType;
    this.condition = props.condition;
    this.actions = new Set(props.actions);
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

  readonly setActions = (actions: Action | Action[] | null): Permission => {
    if (Array.isArray(actions)) {
      actions.forEach((action) => this.actions.add(action));
    } else if (typeof actions === 'string') {
      this.actions.add(actions);
    }
    return this;
  };
}
