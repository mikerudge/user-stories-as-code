import UserType from './userType';
import uniqid from 'uniqid';
import Permission, { Action } from './permissions';

type ModelProps = {
  name: string;
};

export class Model {
  id: string;
  name: string | undefined;

  canCreate: Permission[] = [];
  canRead: Permission[] = [];
  canUpdate: Permission[] = [];
  canDelete: Permission[] = [];

  cannotCreate: Permission[] = [];
  cannotRead: Permission[] = [];
  cannotUpdate: Permission[] = [];
  cannotDelete: Permission[] = [];

  constructor(props?: ModelProps) {
    this.id = uniqid();
    this.name = props?.name;
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
    // if actions is an array of actions, loop through and add each one
    if (Array.isArray(permission.actions)) {
      permission.actions.forEach((action) => {
        return levelObject[action](permission);
      });
    } else if (typeof permission.actions === 'string') {
      levelObject[permission.actions](permission);
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
      this.canCreate.push(permission);
    } else {
      this.cannotCreate.push(permission);
    }

    return this;
  };

  private addUpdate = (permission: Permission): Model => {
    if (permission.can) {
      this.canUpdate.push(permission);
    } else {
      this.cannotUpdate.push(permission);
    }
    return this;
  };

  private addDelete = (permission: Permission): Model => {
    if (permission.can) {
      this.canDelete.push(permission);
    } else {
      this.cannotDelete.push(permission);
    }
    return this;
  };

  private addRead = (permission: Permission): Model => {
    if (permission.can) {
      this.canRead.push(permission);
    } else {
      this.cannotRead.push(permission);
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
