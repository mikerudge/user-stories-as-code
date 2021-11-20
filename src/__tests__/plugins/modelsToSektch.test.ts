import User from '../../userType';
import { Model } from '../../model';
import Permission from '../../permission';
import { ModelsToSketch } from '../../plugins/modelsToSketch';
it('should create a sketch file', () => {
  /* ---------------------------------- Users --------------------------------- */
  const adminUser = new User({ name: 'Admin' });
  const author = new User({ name: 'Author' });
  const reader = new User({ name: 'Reader' });

  /* ------------------------------- Permissions ------------------------------ */
  const authorPerms = new Permission({ actions: ['update', 'create'], userType: author, belongsTo: 'owner' });
  const authorReadPerm = new Permission({ actions: ['read'], userType: author });
  const adminPerms = new Permission({ actions: ['all'], userType: adminUser });
  const readerPerms = new Permission({ actions: ['read'], userType: reader });

  /* ------------------------------- Models ----------------------------------- */
  const authorModel = new Model({ name: 'Author' })
    .addPermission(authorPerms)
    .addPermission(adminPerms)
    .addPermission(authorReadPerm)
    .addPermission(readerPerms);

  const bookModel = new Model({ name: 'Book' })
    .addPermission(authorPerms)
    .addPermission(authorReadPerm)
    .addPermission(readerPerms)
    .addPermission(new Permission({ userType: author, actions: ['create', 'update'], belongsTo: 'owner' }));

  const userModel = new Model({ name: 'User' })
    .addPermission(authorReadPerm)
    .addPermission(new Permission({ userType: author, actions: ['create', 'update'], belongsTo: 'owner' }))
    .addPermission(adminPerms);

  const commentModel = new Model({ name: 'Comment' })
    .addPermission(authorPerms)
    .addPermission(authorReadPerm)
    .addPermission(readerPerms)
    .addPermission(new Permission({ userType: author, actions: ['create', 'update'], belongsTo: bookModel }));

  const modelsToSketch = new ModelsToSketch([authorModel, bookModel, userModel, commentModel]);
  const r = modelsToSketch.createSketch();
  expect(r).toBeDefined();
});
