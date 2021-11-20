import Department from './department';
import uniqid from 'uniqid';
import Permission, { PermissionOutput, PermissionProps } from './permission';

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
  permissions: Permission | undefined;

  constructor(props?: UserTypeProps) {
    this.name = props?.name ?? '';
    this.id = uniqid();
    this.permissions = props?.permissions;
  }

  setName = (name: string): UserType => {
    this.name = name;
    return this;
  };

  toJSON(): UserTypeOutput {
    return {
      id: this.id,
      name: this.name,
      permissions: this.permissions?.toJSON(),
    };
  }

  output = () => {
    return this.toJSON();
  };

  addPermissions = (permission: Omit<Permission, 'userType'>): UserType => {
    this.permissions = permission.setUserType(this);

    return this;
  };
}
