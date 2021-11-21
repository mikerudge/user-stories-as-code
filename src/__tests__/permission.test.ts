import Model from '../model';
import Permission from '../permission';
import UserType from '../userType';

it('allows userType to be set', () => {
  const userType = new UserType({ name: 'User Type Test' });
  const permission = new Permission({ userType: userType });

  expect(permission?.userType?.name).toBe(userType.name);

  const permission2 = new Permission().setUserType(userType);
  expect(permission2?.userType?.name).toBe(userType.name);

  const outputtedPermission = permission2.output('json');
  expect(outputtedPermission?.userType?.name).toBe(userType.name);

  // @ts-expect-error - Set userType should not be available after output
  expect(outputtedPermission.setUserType).toBeUndefined();
  expect(outputtedPermission.id).toBeDefined();
});

it('allows belongsTo to be set', () => {
  const model = new Model({ name: 'Model Test' });
  const permission = new Permission({ belongsTo: model });
  const name = permission.belongsTo != 'owner' && permission?.belongsTo?.name;
  expect(name).toBe(model.name);

  const permission2 = new Permission().setBelongsTo(model);
  const name2 = permission2.belongsTo != 'owner' && permission2?.belongsTo?.name;
  expect(name2).toBe(model.name);

  const permission3 = new Permission().setBelongsTo('owner');
  const name3 = permission3.belongsTo === 'owner' && permission3.belongsTo;
  expect(name3).toBe('owner');

  const outputtedPermission = permission2.output('json');
  const name4 = outputtedPermission.belongsTo != 'owner' && outputtedPermission?.belongsTo?.name;
  expect(name4).toBe(model.name);

  // @ts-expect-error - Set belongsTo should not be available after output
  expect(outputtedPermission.setBelongsTo).toBeUndefined();
  expect(outputtedPermission.id).toBeDefined();
});
