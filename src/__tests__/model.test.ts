import { Model } from '../models';
import Permission from '../permissions';
import UserType from '../userType';

it('models should allow deny rules', () => {
  const restrictedUser = new UserType({ name: 'RestrictedUser' });

  const userModel = new Model({ name: 'User' }).addPermission(
    new Permission({ userType: restrictedUser, can: false, actions: ['read'] }),
  );

  console.log('userModel', userModel);
  const r = userModel.cannotRead?.[0]?.userType;
  const u = userModel.canRead?.[0]?.userType;

  expect(r).toEqual(restrictedUser);
  expect(u).toBeUndefined();
});

// it('models should allow approved rules', () => {
//   expect(true).toBe(false);
// });
