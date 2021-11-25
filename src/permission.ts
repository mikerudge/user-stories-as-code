import uniqid from 'uniqid';
import Model, { ModelOutput } from './model';
import UserType, { UserTypeOutput } from './userType';

export type Action = 'create' | 'read' | 'update' | 'delete' | 'all' | 'deny';

export type PermissionProps = {
  actions?: Action[];
  belongsTo?: 'owner' | Model | null | undefined;
  userType?: UserType | undefined;
  can?: boolean;
};

export type PermissionOutput = {
  id: string;
  userType?: UserTypeOutput;
  belongsTo?: ModelOutput | null | undefined | 'owner';
  can: boolean;
  actions?: Action[];
};
export default class Permission {
  public readonly id: string;
  public userType: UserType | undefined;
  public belongsTo: 'owner' | Model | null | undefined;
  public actions: Set<Action>;
  public can: boolean;
  constructor(props?: PermissionProps) {
    this.id = uniqid();
    this.userType = props?.userType;
    this.belongsTo = props?.belongsTo;
    this.actions = new Set();
    this.can = props?.can ?? true;
    if (props?.actions) {
      this.setActions(props.actions);
    }
  }

  toJSON(): PermissionOutput {
    const belongsTo = this.belongsTo === 'owner' ? 'owner' : this.belongsTo?.output();

    return {
      id: this.id,
      userType: this.userType?.output('permissions'),
      belongsTo: belongsTo,
      actions: Array.from(this.actions),
      can: this.can,
    };
  }

  public output(type: 'csv' | 'json'): PermissionOutput {
    if (type === 'csv') {
      return this.toJSON();
    }
    if (type === 'json') {
      return this.toJSON();
    }
    return this.toJSON();
  }

  public setUserType(userType: UserType): Permission {
    this.userType = userType;
    return this;
  }

  setBelongsTo(belongsTo: null | 'owner' | undefined | Model): Permission {
    this.belongsTo = belongsTo;
    return this;
  }

  public setCan(can: boolean): Permission {
    this.can = can;
    return this;
  }

  private readonly _setAction = (action: Action): Permission => {
    if (action === 'all') {
      this.actions.add('create');
      this.actions.add('read');
      this.actions.add('update');
      this.actions.add('delete');
    } else {
      this.actions.add(action);
    }
    return this;
  };

  public setActions(actions: Action | Action[] | null): Permission {
    if (Array.isArray(actions)) {
      actions.forEach((action) => this._setAction(action));
    } else if (typeof actions === 'string') {
      this._setAction(actions);
    }
    return this;
  }
}
