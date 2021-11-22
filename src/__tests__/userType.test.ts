import UserType from '../userType';
import Permissions from '../permission';
import Model from '../model';

it('can set the name', () => {
  const user = new UserType({ name: 'user 1' });
  expect(user?.name).toBe('user 1');
  user.name = 'user 2';
  expect(user?.name).toBe('user 2');
  user.setName('user 3');
  expect(user?.name).toBe('user 3');
});

it('can set the permissions', () => {
  const perms = new Permissions({ actions: ['read', 'create'] });
  const userType = new UserType({ name: 'UserType 1', permissions: perms });

  expect(userType?.permission).toBe(perms);

  const perms2 = new Permissions({ actions: ['read', 'create'] });
  const userType2 = new UserType({ name: 'UserType 2' }).addPermission(perms2);

  expect(userType2?.permission).toBe(perms2);
});

it('can add a user to the model with permissions', () => {
  const perms = new Permissions({ actions: ['read', 'create'] });
  const usertype = new UserType({ name: 'UserType 1', permissions: perms });

  expect(usertype?.permission).toBe(perms);

  const model = new Model({ name: 'Model Test', permissions: [usertype] });
  model.permissions.has(perms);

  const model2 = new Model({ name: 'Model Test 2' }).addPermission(usertype);
  model2.permissions.has(perms);
});
