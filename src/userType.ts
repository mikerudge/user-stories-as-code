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
  name: string;
  id: string;
  permission: Permission | undefined;

  constructor(props?: UserTypeProps) {
    this.name = props?.name ?? '';
    this.id = uniqid();
    this.permission = props?.permissions;
  }

  setName = (name: string): UserType => {
    this.name = name;
    return this;
  };

  toJSON(): UserTypeOutput {
    return {
      id: this.id,
      name: this.name,
      permissions: this.permission?.toJSON(),
    };
  }

  addPermission = (permission: Omit<Permission, 'userType'>): UserType => {
    const updatedPermission = permission.setUserType(this);
    this.permission = updatedPermission;

    return this;
  };

  output = (): UserTypeOutput => {
    return this.toJSON();
  };
}
