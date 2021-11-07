import Project from '..';
import { Model } from '../models';

import UserType from '../userType';

it('Should create CRUD stories models', () => {
  const restrictedUser = new UserType({ name: 'RestrictedUser' }).addPermissions({
    actions: 'read',
    condition: 'owner',
  });

  const adminUser = new UserType({ name: 'Admin' }).addPermissions({
    actions: 'all',
  });

  const userModel = new Model({ name: 'User' });
  const todoModel = new Model({ name: 'Todo' });
  const Organisations = new Model({ name: 'Organisation' });
  const sharedLinks = new Model({ name: 'Shared Links' });

  if (restrictedUser.permissions) {
    userModel.addPermission(restrictedUser.permissions);
    todoModel.addPermission(restrictedUser.permissions);
    Organisations.addPermission(restrictedUser.permissions);
    sharedLinks.addPermission(restrictedUser.permissions);
  }

  if (adminUser.permissions) {
    userModel.addPermission(adminUser.permissions);
    todoModel.addPermission(adminUser.permissions);
    Organisations.addPermission(adminUser.permissions);
    sharedLinks.addPermission(adminUser.permissions);
  }

  const project = new Project({ name: 'test' })
    .addModel(userModel)
    .addModel(todoModel)
    .addModel(Organisations)
    .addModel(sharedLinks)
    .generateCrudStories();

  const stories = project.stories;

  expect(stories.length).toBe(16);
  // const story = stories[0];
  // expect(story.summary).toContain('not');
});
