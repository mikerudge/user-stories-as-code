import uniqid from 'uniqid';
import Meta from './Meta';
import Model, { ModelOutput } from './model';
import UserType, { UserTypeOutput } from './userType';

export type Action = 'create' | 'read' | 'update' | 'delete' | 'all' | 'deny';

export type PermissionParams = {
  name?: string;
  description?: string;
  actions?: Action[];
  belongsTo?: 'owner' | Model | null | undefined;
  userType?: UserType | undefined;
  can?: boolean;
};

export type PermissionOutput = {
  id: string;
  name: string;
  description: string;
  userType?: UserTypeOutput;
  belongsTo?: ModelOutput | null | undefined | 'owner';
  can: boolean;
  actions?: Action[];
};
/**
 * Permissions are used to determine what actions a user can perform on a model.
 * These permissions can then be used to on the {@link CRUDStories} to automatically create stories.
 * However, there could be many other applications that use permissions.
 *
 * @example
 *```ts
 * // Create a permission for an admin who has permission to do everything without restriction
 * new Permission({ userType: admin, actions: ['all'] });
 *
 * new Permission({ userType: admin, actions: ['create', 'read', 'update', 'delete'] }); // same as above
 *
 * // create a user who can only read
 * new Permission({userType: reader, actions: ['read']});
 *
 * // create a permission that can only create but also explicitly deny delete
 * new Permission({userType: reader, actions: ['create'], can: false});
 *
 * // Add a permission directly to a user
 * const permission = new Permission({actions: ['create'], can: false});
 * const user = new User({...}).addPermission(permission);
 *```
 * @author Mike Rudge
 * @date 28/11/2021
 * @export
 * @class Permission
 */
export default class Permission implements Meta {
  public readonly id: string;
  public name: string;
  public description: string;
  public userType: UserType | undefined;
  public belongsTo: 'owner' | Model | null | undefined;
  public actions: Set<Action>;
  public can: boolean;
  constructor(params?: PermissionParams) {
    this.id = uniqid();
    this.name = params?.name ?? '';
    this.description = params?.description ?? '';
    this.userType = params?.userType;
    this.belongsTo = params?.belongsTo;
    this.actions = new Set();
    this.can = params?.can ?? true;
    if (params?.actions) {
      this.setActions(params.actions);
    }
  }

  toJSON(): PermissionOutput {
    const belongsTo = this.belongsTo === 'owner' ? 'owner' : this.belongsTo?.output();

    return {
      id: this.id,
      name: this.name,
      description: this.description,
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

  public setName(name: string): Permission {
    this.name = name;
    return this;
  }

  public setDescription(description: string): Permission {
    this.description = description;
    return this;
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
