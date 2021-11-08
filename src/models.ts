import UserType from './userType';
import uniqid from 'uniqid';
import Permission, { Action } from './permissions';
import CRUDStories from './CRUDStories';

type ModelProps = {
  name: string;
};

export class Model {
  id: string;
  name: string | undefined;
  permissions: Set<Permission> = new Set();

  userTypes: Set<UserType>;

  constructor(props?: ModelProps) {
    this.id = uniqid();
    this.name = props?.name;
    this.userTypes = new Set();
  }

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
  private _addPermissionToModel = (permission: Permission): Model => {
    const hasPermission = this.permissions.has(permission);
    if (!hasPermission) {
      this.permissions.forEach((existingPermission) => {
        if (existingPermission.userType.id === permission.userType.id) {
          permission.actions.forEach((action) => {
            if (existingPermission.actions.has(action)) {
              throw new Error(`Permission for action ${action} already exists for ${permission.userType.name}`);
            }
          });
        }
      });

      if (permission.userType) {
        this._addUserTypeToModel(permission.userType);
      }
      this.permissions.add(permission);
    }

    return this;
  };

  private _addUserTypeToModel = (userType: UserType): Model => {
    this.userTypes.add(userType);

    if (userType.permissions) {
      this.addPermission(userType.permissions);
    }

    return this;
  };

  public readonly addUserType = (userType: UserType | UserType[]): Model => {
    if (Array.isArray(userType)) {
      userType.forEach((user) => {
        this._addUserTypeToModel(user);
      });
    } else {
      this._addUserTypeToModel(userType);
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
  public readonly addPermission = (permission: Permission | Permission[]): Model => {
    if (Array.isArray(permission)) {
      permission.forEach((perm) => {
        this._addPermissionToModel(perm);
      });
    } else {
      this._addPermissionToModel(permission);
    }
    return this;
  };

  /**
   * @description set the model name
   * @author Mike Rudge
   * @date 08/11/2021
   * @param {string} value
   * @memberof Model
   */
  public readonly addName = (value: string): Model => {
    this.name = value;
    return this;
  };
}
