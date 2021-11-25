import uniqid from 'uniqid';

import Department from './department';
import Permission, { PermissionOutput } from './permission';

export type UserTypeProps = {
  name: string;
  permissions?: Permission;
  department?: Department;
};

export type UserTypeOutput = {
  id: string;
  permissions: PermissionOutput | undefined | null;
} & Omit<UserTypeProps, 'permissions'>;

export default class UserType {
  public readonly id: string = uniqid();
  public name: string;
  permission: Permission | undefined;

  constructor(props?: UserTypeProps) {
    this.name = props?.name ?? '';
    this.permission = props?.permissions;
  }

  setName(name: string): UserType {
    this.name = name;
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
      permissions: ignore === 'permissions' ? null : this.permission?.toJSON(),
    };
  }

  output = (ignore?: 'permissions' | 'name'): UserTypeOutput => {
    return this.toJSON(ignore);
  };
}
