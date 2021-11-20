import { Model } from '../model';
import Permission from '../permission';
import UserType from '../userType';

it('allows name to be set', () => {
  const model = new Model({ name: 'Model Test' });

  expect(model.name).toBe('Model Test');

  const model2 = new Model().setName('Model Test 2');
  expect(model2.name).toBe('Model Test 2');

  const outputtedModel = model2.output();
  expect(outputtedModel.name).toBe('Model Test 2');
  // Check id is auto generated
  expect(model2.id).toBeDefined();
  expect(outputtedModel.id).toBeDefined();
});

it('models allows permissions to be added', () => {
  const restrictedUser = new UserType({ name: 'RestrictedUser' });
  const permission = new Permission({ userType: restrictedUser, actions: ['read'] });
  const permission2 = new Permission({ userType: restrictedUser, actions: ['all'] });

  const model = new Model({ name: 'Model Test', permissions: [permission] });
  expect(model.permissions.size).toBe(1);
  expect(model.permissions.has(permission)).toBeTruthy();

  const userModel = new Model({ name: 'User' }).addPermission(permission);

  expect(userModel.permissions.size).toBe(1);
  expect(userModel.permissions.has(permission)).toBeTruthy();
  // Should deduplicate permissions
  userModel.addPermission(permission);
  userModel.addPermission(permission);
  userModel.addPermission(permission);
  userModel.addPermission(permission2);
  userModel.addPermission(permission2);

  expect(userModel.permissions.size).toBe(2);

  const outputtedModel = userModel.output();
  expect(outputtedModel?.permissions?.length).toBe(2);
});

it('user types on permissions get auto added to the model', () => {
  const restrictedUser = new UserType({ name: 'RestrictedUser' });
  const restrictedUser2 = new UserType({ name: 'RestrictedUser 2' });
  const restrictedUser3 = new UserType({ name: 'RestrictedUser 4' });

  const permission = new Permission({ userType: restrictedUser, actions: ['read'] });
  const permission2 = new Permission({ userType: restrictedUser2, actions: ['all'] });
  const permission3 = new Permission().setUserType(restrictedUser3).setActions(['all']);

  const model = new Model({ name: 'Model Test', permissions: [permission, permission2, permission3] });
  expect(model.permissions.size).toBe(3);

  expect(model.userTypes.size).toBe(3);
});

it('models can output to json', () => {
  const userType = new UserType({ name: 'RestrictedUser' });
  const userType2 = new UserType({ name: 'User' });
  const permission = new Permission({ userType: userType, actions: ['all'] });
  const permission2 = new Permission({ userType: userType2, actions: ['all'] });
  const model = new Model({ name: 'Model Test' })
    .addPermission(permission2)
    .addPermission(permission)
    .addPermission(permission2); // Should deduplicate permissions

  const outputtedModel = model.output();
  expect(outputtedModel).toHaveProperty('name', 'Model Test');
  expect(outputtedModel).toHaveProperty('userTypes');
  expect(outputtedModel).toHaveProperty('permissions');
  expect(outputtedModel?.userTypes?.length).toBe(2);
  expect(outputtedModel?.permissions?.length).toBe(2);
});

it('Models with conflicting permissions should error', () => {
  const userType = new UserType({ name: 'User' });

  const model = new Model({ name: 'Model Test' }).addPermission(
    new Permission({ userType: userType, actions: ['read'] }),
  );

  const conflictingPermission = new Permission({ userType: userType, actions: ['read'], can: false });

  expect(() => model.addPermission(conflictingPermission)).toThrowError(
    'Permission for action read has the opposite permission for User on model Model Test',
  );
});
