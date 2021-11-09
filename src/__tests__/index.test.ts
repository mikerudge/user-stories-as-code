import Department from '../department';
import { Epic } from '../epic';
import Project from '../index';
import { Model } from '../models';
import Permission from '../permissions';
import Task from '../task';
import UserStory from '../userStory';
import UserType from '../userType';
import CRUDStories from '../CRUDStories';

it('Create a new project', () => {
  // Define the different user types in the project
  const admin = new UserType({ name: 'Admin' });
  const businessOwner = new UserType({ name: 'Business Owner' });

  // Define the different departments in the stories
  const developers = new Department({ name: 'Developers' });

  // Create the different epics for the project
  const authEpic = new Epic({ name: 'Auth', description: 'Everything to do with auth' });

  // Create a custom story
  const firstUserStory = new UserStory()
    .setAsA(admin)
    .setIWant('to be able to create a new project')
    .setSoThat('I can start working on it')
    .addTask(new Task({ name: 'Create a new project' }))
    .addTask(new Task({ name: 'Setup github repo' }))
    .addEpic(authEpic)
    .addDepartment(developers);

  const organisation = new Model({ name: 'Organisation' });
  const userModel = new Model({ name: 'User' }).addPermission(new Permission({ userType: admin, actions: ['all'] }));
  const authorModel = new Model({ name: 'Author' })
    .addPermission(new Permission({ userType: admin, actions: ['read'], can: false }))
    .addPermission(new Permission({ userType: businessOwner, actions: ['read'], condition: 'owner' }));
  const taskModel = new Model({ name: 'Task' }).addPermission(new Permission({ userType: admin, actions: ['all'] }));
  const bookModel = new Model({ name: 'Book' });

  // Create a new project that puts it all together
  const project = new Project({ name: 'Awesome Sauce' })
    .addStory(
      new UserStory({ asA: admin, iWant: 'to be able to code a story', soICan: 'Easily create stories using code' }),
    )
    .addStory(firstUserStory);

  new CRUDStories(project)
    .addModel(organisation)
    .addModel(userModel)
    .addModel(authorModel)
    .addModel(taskModel)
    .addModel(bookModel)
    .generate();

  project.create();

  console.log('stories.size', project.stories.size);
  console.log('project', JSON.stringify(project, null, 2));

  expect(project.name).toBe('Awesome Sauce');
});
