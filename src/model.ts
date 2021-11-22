import uniqid from 'uniqid';

import Permission, { Action, PermissionOutput } from './permission';
import UserType, { UserTypeOutput } from './userType';

type ModelProps = {
  name?: string;
  permissions?: Permission[] | UserType[] | [Permission, UserType] | Permission | UserType;
  relations?: Model | Model[];
};

export type ModelOutput = {
  id: string;
  name: string;
  permissions?: PermissionOutput[];
  userTypes?: UserTypeOutput[];
};

export default class Model {
  id: string;
  name: string | undefined;
  permissions: Set<Permission>;
  userTypes: Set<UserType>;
  actions: Set<Action> = new Set();
  relations: Set<Model> = new Set();

  constructor(props?: ModelProps) {
    this.id = uniqid();
    this.name = props?.name;
    this.userTypes = new Set();

    this.permissions = new Set();

    if (props?.permissions) {
      this.addPermission(props.permissions);
    }

    if (props?.relations) {
      this.addRelation(props.relations);
    }
  }

  private readonly _addRelation = (relation: Model) => {
    if (relation.id === this.id) {
      throw new Error(`model ${relation.name} cannot relate to itself`);
    }
    this.relations.add(relation);
  };

  public readonly addRelation = (relation: Model | Model[]): Model => {
    if (Array.isArray(relation)) {
      relation.forEach((r) => this._addRelation(r));
    } else {
      this._addRelation(relation);
    }
    return this;
  };

  public readonly setName = (name: string): Model => {
    this.name = name;
    return this;
  };

  private readonly getPermissionFromUserType = (userType: UserType): Permission => {
    if (!userType) {
      throw new Error(`userType is not defined on userType ${this.name}`);
    }
    if (!userType?.permission) {
      throw new Error(`UserType ${userType?.name} does not have any permission`);
    }
    return userType.permission;
  };

  /**
   * @description map for the correct permission function to call
   * @author Mike Rudge
   * @date 06/11/2021
   * @private
   * @param {Level} level
   * @param {UserType} userType
   * @param {boolean} [can=true]
   * @memberof Model
   */
  private _addPermissionToModel = (permission: Permission | UserType): Model => {
    const realPermission = permission instanceof Permission ? permission : this.getPermissionFromUserType(permission);
    const hasPermission = this.permissions.has(realPermission);

    if (!hasPermission) {
      this.permissions.forEach((existingPermission) => {
        if (existingPermission?.userType?.id === realPermission?.userType?.id) {
          realPermission.actions.forEach((action) => {
            if (existingPermission.actions.has(action) && existingPermission.can !== realPermission.can) {
              throw new Error(
                `Permission for action ${action} has the opposite permission for ${realPermission?.userType?.name} on model ${this.name}`,
              );
            }
          });
        }
      });
    }
    this.permissions.add(realPermission);
    if (realPermission.actions && realPermission.actions.size > 0 && realPermission.can) {
      realPermission.actions.forEach((action) => {
        this.actions.add(action);
      });
    }
    if (realPermission.userType) {
      this.userTypes.add(realPermission.userType);
    }
    if (permission instanceof UserType) {
      this.userTypes.add(permission);
    }
    return this;
  };

  /**
   * @description add permission to model
   * @author Mike Rudge
   * @date 08/11/2021
   * @param {(Permission | Permission[])} permission
   * @memberof Model
   */
  public readonly addPermission = (
    permission: Permission | Permission[] | UserType | UserType[] | [Permission, UserType],
  ): Model => {
    if (Array.isArray(permission)) {
      permission.forEach((perm) => {
        this._addPermissionToModel(perm);
      });
    } else {
      this._addPermissionToModel(permission);
    }

    return this;
  };

  toJSON(): ModelOutput {
    const permissions: PermissionOutput[] = [];
    this.permissions.forEach((permission) => {
      permissions.push(permission.toJSON());
    });
    const userTypes: UserTypeOutput[] = [];
    this.userTypes.forEach((userType) => {
      userTypes.push(userType.toJSON());
    });

    return {
      id: this.id,
      name: this.name ?? '',
      permissions: permissions,
      userTypes: userTypes,
    };
  }

  public readonly output = (): ModelOutput => {
    return this.toJSON();
  };
}
