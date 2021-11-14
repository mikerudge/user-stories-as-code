import uniqid from 'uniqid';
import { Model } from './models';
import UserType from './userType';

export type Action = 'create' | 'read' | 'update' | 'delete' | 'all' | 'deny';

export type PermissionProps = {
  actions?: Action[];
  belongsTo?: 'owner' | Model | null | undefined;
  userType: UserType;
  can?: boolean;
};

export type PermissionOutput = {
  id: string;
} & PermissionProps;
export default class Permission {
  public readonly id: string;
  public userType: UserType;
  public belongsTo: 'owner' | Model | null | undefined;
  public actions: Set<Action>;
  public can: boolean;
  constructor(props: PermissionProps) {
    this.id = uniqid();
    this.userType = props.userType;
    this.belongsTo = props.belongsTo;
    this.actions = new Set(props.actions);
    this.can = props.can ?? true;
  }

  toJSON(): PermissionOutput {
    return {
      id: this.id,
      userType: this.userType,
      belongsTo: this.belongsTo,
      actions: Array.from(this.actions),
      can: this.can,
    };
  }

  output = (type: 'csv' | 'json'): PermissionOutput => {
    if (type === 'csv') {
      return this.toJSON();
    }
    if (type === 'json') {
      return this.toJSON();
    }
    return this.toJSON();
  };

  setUserType = (userType: UserType): Permission => {
    this.userType = userType;
    return this;
  };

  setBelongsTo = (belongsTo: null | 'owner' | undefined): Permission => {
    this.belongsTo = belongsTo;
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
