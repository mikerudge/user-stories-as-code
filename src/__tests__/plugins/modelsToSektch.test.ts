import User from '../../userType';
import Model from '../../model';
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
  const reviewModel = new Model({ name: 'Review' })
    .addPermission(authorPerms)
    .addPermission(adminPerms)
    .addPermission(authorReadPerm)
    .addPermission(readerPerms);

  const bookModel = new Model({ name: 'Book' })
    .addPermission(authorPerms)
    .addPermission(authorReadPerm)
    .addPermission(readerPerms)
    .addPermission(new Permission({ userType: author, actions: ['create', 'update'], belongsTo: 'owner' }))
    .addRelation(reviewModel);

  const commentModel = new Model({ name: 'Comment' })
    .addPermission(authorPerms)
    .addPermission(authorReadPerm)
    .addPermission(readerPerms)
    .addPermission(new Permission({ userType: author, actions: ['create', 'update'], belongsTo: bookModel }))
    .addRelation(bookModel);

  bookModel.addRelation(commentModel);
  reviewModel.addRelation(bookModel);

  const userModel = new Model({ name: 'User' })
    .addPermission(authorReadPerm)
    .addPermission(new Permission({ userType: author, actions: ['create', 'update'], belongsTo: 'owner' }))
    .addPermission(adminPerms)
    .addRelation(reviewModel)
    .addRelation(bookModel)
    .addRelation(commentModel);

  const modelsToSketch = new ModelsToSketch([reviewModel, bookModel, userModel, commentModel]);
  const r = modelsToSketch.createSketch();
  expect(r).toBeDefined();
});
