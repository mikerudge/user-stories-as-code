import uniqid from 'uniqid';

import Department from './department';
import Meta from './Meta';
import Permission, { PermissionOutput } from './permission';

export type UserTypeParams = {
  name: string;
  description?: string;
  permissions?: Permission;
  department?: Department;
};

export type UserTypeOutput = {
  id: string;
  permissions: PermissionOutput | undefined | null;
} & Omit<UserTypeParams, 'permissions'>;

/**
 * The UserType class represents a single user that will be used in the {@link UserStory} class.
 *
 * @example
 *```ts
 * const permission = new Permission({...})
 * new UserType({name: "Admin", permissions: permission})
 *```
 * @see - {@link UserStory}
 * @see - {@link Permission}
 *
 * @remark - UserTypes will automatically be added to the project when used in the {@link UserStory} class.
 *
 *
 * @author Mike Rudge
 * @date 28/11/2021
 * @export
 * @class UserType
 */
export default class UserType implements Meta {
  public readonly id: string = uniqid();
  public name: string;
  public description: string;
  permission: Permission | undefined;

  constructor(params?: UserTypeParams) {
    this.name = params?.name ?? '';
    this.permission = params?.permissions;
    this.description = params?.description ?? '';
  }

  setName(name: string): UserType {
    this.name = name;
    return this;
  }

  setDescription(description: string): UserType {
    this.description = description;
    return this;
  }

  addPermission(permission: Omit<Permission, 'userType'>): UserType {
    const updatedPermission = permission.setUserType(this);
    this.permission = updatedPermission;

    return this;
  }

  toJSON(ignore?: 'permissions' | 'name'): UserTypeOutput {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      permissions: ignore === 'permissions' ? null : this.permission?.toJSON(),
    };
  }

  output = (ignore?: 'permissions' | 'name'): UserTypeOutput => {
    return this.toJSON(ignore);
  };
}
