import Project from '..';
import CRUDStories from '../CRUDStories';
import Model from '../model';
import Permission from '../permission';
import UserType from '../userType';

it('Should create CRUD stories models', () => {
  const restrictedUser = new UserType({ name: 'RestrictedUser' }).addPermissions(
    new Permission({ actions: ['read'] }).setBelongsTo('owner'),
  );

  const adminUser = new UserType({ name: 'Admin' }).addPermissions(new Permission({ actions: ['all'] }));

  const heroUser = new UserType({ name: 'Hero' }).addPermissions(new Permission({ actions: ['update', 'create'] }));

  const todoModel = new Model({ name: 'Todo' });
  const permission = new Permission({ belongsTo: todoModel, userType: restrictedUser });
  const permission2 = new Permission({ userType: adminUser, actions: ['all'] });
  const userModel = new Model({ name: 'User' }).addPermission(permission);
  const Organisations = new Model({ name: 'Organisation' });
  const sharedLinks = new Model({ name: 'Shared Links' }).addPermission(
    new Permission({ belongsTo: Organisations, userType: restrictedUser }).setActions(['read', 'create', 'update']),
  );

  userModel.addPermission([permission, permission2]).addPermission(heroUser);
  todoModel.addPermission([permission, permission2]);
  Organisations.addPermission([permission, permission2]);
  sharedLinks.addPermission([permission, permission2]);

  const stories = new CRUDStories().addModel([Organisations, sharedLinks, userModel, todoModel]).generate();

  const project = new Project({ name: 'test' });
  project.addStories(stories);

  expect(project.stories.size).toBe(56);
  // const story = stories[0];
  // expect(story.summary).toContain('not');
});
