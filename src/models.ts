import UserType from './userType';
import uniqid from 'uniqid';
import Permission, { Action } from './permissions';

type ModelProps = {
  name: string;
};

export class Model {
  id: string;
  name: string | undefined;

  canCreate: Set<Permission> = new Set();
  canRead: Set<Permission> = new Set();
  canUpdate: Set<Permission> = new Set();
  canDelete: Set<Permission> = new Set();

  cannotCreate: Set<Permission> = new Set();
  cannotRead: Set<Permission> = new Set();
  cannotUpdate: Set<Permission> = new Set();
  cannotDelete: Set<Permission> = new Set();

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
    const levelObject: { [Key in Action]: (perm: Permission) => Model } = {
      all: this.fullAccess,
      deny: this.noAccess,
      create: this.addCreate,
      read: this.addRead,
      update: this.addUpdate,
      delete: this.addDelete,
    };

    permission.actions.forEach((action) => {
      return levelObject[action](permission);
    });

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

  public readonly addPermission = (permission: Permission): Model => {
    if (permission) {
      this._addPermissionToModel(permission);
    }

    return this;
  };

  readonly addName = (value: string): Model => {
    this.name = value;
    return this;
  };

  private addCreate = (permission: Permission): Model => {
    if (permission.can) {
      // if permission.userType is already  in the this.canCreate set then remove the only one first,
      this.canCreate.forEach((perm) => {
        if (perm.userType === permission.userType) {
          this.canCreate.delete(perm);
        }
      });
      // then add the new one
      this.canCreate.add(permission);
    } else {
      this.cannotCreate.forEach((perm) => {
        if (perm.userType === permission.userType) {
          this.canCreate.delete(perm);
        }
      });
      this.cannotCreate.add(permission);
    }

    return this;
  };

  private addUpdate = (permission: Permission): Model => {
    if (permission.can) {
      this.canUpdate.add(permission);
    } else {
      this.cannotUpdate.add(permission);
    }
    return this;
  };

  private addDelete = (permission: Permission): Model => {
    if (permission.can) {
      this.canDelete.add(permission);
    } else {
      this.cannotDelete.add(permission);
    }
    return this;
  };

  private addRead = (permission: Permission): Model => {
    if (permission.can) {
      this.canRead.add(permission);
    } else {
      this.cannotRead.add(permission);
    }
    return this;
  };

  private fullAccess = (permission: Permission): Model => {
    this.addCreate(permission);
    this.addUpdate(permission);
    this.addDelete(permission);
    this.addRead(permission);
    return this;
  };

  private noAccess = (permission: Permission): Model => {
    this.addCreate(permission);
    this.addUpdate(permission);
    this.addDelete(permission);
    this.addRead(permission);
    return this;
  };
}
