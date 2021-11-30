import uniqid from 'uniqid';
import Meta from './Meta';

import Permission, { Action, PermissionOutput } from './permission';
import UserType, { UserTypeOutput } from './userType';

type ModelParams = {
  name?: string;
  description?: string;
  permissions?: Permission[] | UserType[] | [Permission, UserType] | Permission | UserType;
  relations?: Model | Model[];
};

export type ModelOutput = {
  id: string;
  name: string;
  description: string;
  permissions?: PermissionOutput[];
  userTypes?: UserTypeOutput[];
};

/**
 * You can think of models as collections in MongoDB or tables in SQL.
 * They are at a high level the major data points, for example `users` `books` `comments`
 *
 * @example
 *```ts
 * new Model({name: "Book", permissions: [new Permission({...})]})
 *```
 * @remarks
 * You can also add a user to the permissions array, this will then use the default permissions of that {@link UserType}
 *
 * @example
 *```ts
 * new Model({name: "Book", permissions: [new Permission({...}), new UserType({...})]})
 * // or you can use chain methods
 * const admin = new UserType({...})
 * const authorPermissions = new Permission({...})
 * new Model({name: "Comment"}).addPermission(admin).addPermission(authorPermissions)
 * // addPermission also accepts an array of userTypes and permissions
 * new Model({name: "Review"}).addPermission([admin, authorPermission])
 *```
 * @author Mike Rudge
 * @date 28/11/2021
 * @export
 * @class Model
 */
export default class Model implements Meta {
  id: string;
  name: string;
  permissions: Set<Permission>;
  userTypes: Set<UserType>;
  actions: Set<Action> = new Set();
  relations: Set<Model> = new Set();
  description: string;

  constructor(params?: ModelParams) {
    this.id = uniqid();
    this.name = params?.name ?? '';
    this.description = params?.description ?? '';
    this.userTypes = new Set();

    this.permissions = new Set();

    if (params?.permissions) {
      this.addPermission(params.permissions);
    }

    if (params?.relations) {
      this.addRelation(params.relations);
    }
  }

  public setDescription(description: string): Model {
    this.description = description;
    return this;
  }

  private readonly _addRelation = (relation: Model) => {
    if (relation.id === this.id) {
      throw new Error(`model ${relation.name} cannot relate to itself`);
    }
    this.relations.add(relation);
  };

  public addRelation(relation: Model | Model[]): Model {
    if (Array.isArray(relation)) {
      relation.forEach((r) => this._addRelation(r));
    } else {
      this._addRelation(relation);
    }
    return this;
  }

  public setName(name: string): Model {
    this.name = name;
    return this;
  }

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
  public addPermission(permission: Permission | Permission[] | UserType | UserType[] | [Permission, UserType]): Model {
    if (Array.isArray(permission)) {
      permission.forEach((perm) => {
        this._addPermissionToModel(perm);
      });
    } else {
      this._addPermissionToModel(permission);
    }

    return this;
  }

  private toJSON(): ModelOutput {
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
      description: this.description ?? '',
      permissions: permissions,
      userTypes: userTypes,
    };
  }

  public readonly output = (): ModelOutput => {
    return this.toJSON();
  };
}
