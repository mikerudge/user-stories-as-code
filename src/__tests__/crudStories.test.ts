import Project from '..';
import CRUDStories from '../CRUDStories';
import Model from '../model';
import Permission from '../permission';
import UserType from '../userType';

it('Should create CRUD stories models', () => {
  const restrictedUser = new UserType({ name: 'RestrictedUser' }).addPermission(
    new Permission({ actions: ['read'] }).setBelongsTo('owner'),
  );

  const adminUser = new UserType({ name: 'Admin' }).addPermission(new Permission({ actions: ['all'] }));
  const heroUser = new UserType({ name: 'Hero' }).addPermission(new Permission({ actions: ['update', 'create'] }));

  const todoModel = new Model({ name: 'Todo' });
  const permission = new Permission({ belongsTo: todoModel, userType: restrictedUser });
  const permission2 = new Permission({ userType: adminUser, actions: ['all'] });
  // Models
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

it('Should create CRUD stories models with permissions', () => {
  const admin = new UserType({ name: 'Admin' }).addPermission(new Permission({ actions: ['all'] }));

  const businessOwner = new UserType({ name: 'Business Owner' }).addPermission(
    // Default permission to read and update if they are the owner of the model
    new Permission({ actions: ['read', 'update'], belongsTo: 'owner' }),
  );

  const consumer = new UserType({ name: 'Consumer' })
    .addPermission(new Permission({ actions: ['read'] }))
    .addPermission(new Permission({ actions: ['delete', 'update'], can: false }));

  const managerPermissions = new Permission({
    actions: ['read', 'update'],
  });
  const manager = new UserType({ name: 'Manager' }).addPermission(managerPermissions);

  const announcement = new Model({
    name: 'Announcement',
    permissions: [admin, manager, consumer],
  });

  const areas = new Model({
    name: 'Area',
    permissions: [admin, manager],
  });

  const business = new Model({
    name: 'Business',
    permissions: [admin, businessOwner, manager],
  });

  const forum = new Model({
    name: 'Forum',
    permissions: [admin],
  });

  const categories = new Model({
    name: 'Categories',
    permissions: [admin, manager],
  });

  const adminPermissions = new Permission({ userType: admin, actions: ['all'] });
  const managerPermissions1 = new Permission({
    userType: manager,
    actions: ['read', 'update', 'create'],
  });

  const geoFence = new Model({
    name: 'GeoFence',
    permissions: [adminPermissions, managerPermissions1],
  });

  const localAuthority = new Model({
    name: 'Local Authority',
    permissions: [admin, manager],
  });

  const post = new Model({
    name: 'post',
    permissions: [admin, businessOwner, manager],
  });

  const businessOwnerProductPermissions = new Permission({
    userType: businessOwner,
    actions: ['create', 'read', 'update', 'delete'],
  });

  const adminPermissions1 = new Permission({
    userType: admin,
    actions: ['read'],
    can: true,
  });

  // Explicity say that an admin cannot change the products of a business
  const blockedAdminPermission = new Permission({
    userType: admin,
    actions: ['update', 'create', 'delete'],
    can: false,
  });

  const product = new Model({
    name: 'Product',
    permissions: [businessOwnerProductPermissions, adminPermissions1, blockedAdminPermission],
  });

  const promotion = new Model({
    name: 'Promotion',
    permissions: [admin, businessOwner, manager],
  });

  const userModel = new Model({
    name: 'User',
  }).addPermission(admin);

  const stories = new CRUDStories()
    .addModel([
      announcement,
      areas,
      business,
      categories,
      forum,
      geoFence,
      localAuthority,
      post,
      product,
      promotion,
      userModel,
    ])
    .generate();
  expect(stories.length).toBe(204);
});
