import Project from '..';
import { Model } from '../models';

import UserType from '../userType';

it('Should create CRUD stories models', () => {
  const restrictedUser = new UserType({ name: 'RestrictedUser' }).addPermissions({
    actions: ['read'],
    condition: 'owner',
  });

  const adminUser = new UserType({ name: 'Admin' }).addPermissions({
    actions: ['all'],
  });

  const userModel = new Model({ name: 'User' });
  const todoModel = new Model({ name: 'Todo' });
  const Organisations = new Model({ name: 'Organisation' });
  const sharedLinks = new Model({ name: 'Shared Links' });

  userModel.addUserType([restrictedUser, adminUser]);
  todoModel.addUserType([restrictedUser, adminUser]);
  Organisations.addUserType([restrictedUser, adminUser]);
  sharedLinks.addUserType([restrictedUser, adminUser]);

  const project = new Project({ name: 'test' })
    .addModel(userModel)
    // Should deduplicate the models
    .addModel(userModel)
    .addModel(todoModel)
    .addModel(todoModel)
    .addModel(Organisations)
    .addModel(Organisations)
    .addModel(sharedLinks)
    .addModel(sharedLinks)
    .generateCrudStories();

  const models = project.models;
  expect(models.size).toBe(4);

  const stories = project.stories;

  expect(stories.size).toBe(40);
  // const story = stories[0];
  // expect(story.summary).toContain('not');
});
