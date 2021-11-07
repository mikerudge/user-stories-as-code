import Department from './department';
import uniqid from 'uniqid';
import Permission, { PermissionProps } from './permissions';

export type UserTypeProps = {
  name: string;
  permissions?: Permission;
  department?: Department;
};

export default class UserType {
  name: string;
  id: string;
  permissions: Permission | undefined;

  constructor(props: UserTypeProps) {
    this.name = props.name;
    this.id = uniqid();
    this.permissions = props.permissions;
  }

  setName = (name: string): UserType => {
    this.name = name;
    return this;
  };

  create = () => {
    return {
      name: this.name,
    };
  };

  addPermissions = (permission: Omit<PermissionProps, 'userType'>): UserType => {
    this.permissions = new Permission({ ...permission, userType: this });

    return this;
  };
}
