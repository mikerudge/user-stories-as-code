import Project from '..';
import CRUDStories from '../CRUDStories';
import { Model } from '../models';
import Permission from '../permissions';

import UserType from '../userType';

it('Should create CRUD stories models', () => {
  const restrictedUser = new UserType({ name: 'RestrictedUser' }).addPermissions({
    actions: ['read'],
    belongsTo: 'owner',
  });

  const adminUser = new UserType({ name: 'Admin' }).addPermissions({
    actions: ['all'],
  });

  const todoModel = new Model({ name: 'Todo' });
  const userModel = new Model({ name: 'User' }).addPermission(
    new Permission({ belongsTo: todoModel, userType: restrictedUser }),
  );
  const Organisations = new Model({ name: 'Organisation' });
  const sharedLinks = new Model({ name: 'Shared Links' }).addPermission(
    new Permission({ belongsTo: Organisations, userType: restrictedUser }).setActions(['read', 'create', 'update']),
  );

  userModel.addUserType([restrictedUser, adminUser]);
  todoModel.addUserType([restrictedUser, adminUser]);
  Organisations.addUserType([restrictedUser, adminUser]);
  sharedLinks.addUserType([restrictedUser, adminUser]);

  const project = new Project({ name: 'test' });

  new CRUDStories({ project })
    .addModel(Organisations)
    .addModel(userModel)
    .addModel(todoModel)
    .addModel(sharedLinks)
    .generate();
  const stories = project.stories;

  expect(stories.size).toBe(49);
  // const story = stories[0];
  // expect(story.summary).toContain('not');
});
