import { Model } from '../models';
import Permission from '../permissions';
import UserType from '../userType';

it('models should allow deny rules', () => {
  const restrictedUser = new UserType({ name: 'RestrictedUser' });

  const userModel = new Model({ name: 'User' }).addPermission(
    new Permission({ userType: restrictedUser, can: false, actions: ['read'] }),
  );
});

// it('models should allow approved rules', () => {
//   expect(true).toBe(false);
// });
