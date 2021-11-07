import Department from '../department';
import { Epic } from '../epic';
import Project from '../index';
import { Model } from '../models';
import Permission from '../permissions';
import Task from '../task';
import UserStory from '../userStory';
import UserType from '../userType';

it('Create a new project', () => {
  // Define the different user types in the project
  const admin = new UserType({ name: 'Admin' });
  const businessOwner = new UserType({ name: 'Business Owner' });
  const user = new UserType({ name: 'User' });

  // Define the different departments in the stories
  const developers = new Department({ name: 'Developers' });

  // Create the different epics for the project
  const authEpic = new Epic({ name: 'Auth', description: 'Everything to do with auth' });

  // Create stories
  const firstUserStory = new UserStory()
    .AsA(admin)
    .IWant('to be able to create a new project')
    .SoThat('I can start working on it')
    .addTask(new Task({ name: 'Create a new project' }))
    .addTask(new Task({ name: 'Setup github repo' }))
    .addEpic(authEpic)
    .addDepartment(developers);

  const userModel = new Model({ name: 'User' }).addPermission(new Permission({ userType: admin, actions: 'all' }));
  console.log('userModel', userModel);

  const organisation = new Model({ name: 'Organisation' });
  const houseModel = new Model({ name: 'House' })
    .addPermission(new Permission({ userType: admin, actions: 'read' }))
    .addPermission(new Permission({ userType: businessOwner, actions: 'read', condition: 'owner' }));

  const taskModel = new Model({ name: 'Task' }).addPermission(new Permission({ userType: admin, actions: 'all' }));
  const youngPersonModel = new Model({ name: 'Young Person' });

  // Create a new project that puts it all together
  const project = new Project({ name: 'Fabric' })
    .addModel(userModel)
    .addModel(houseModel)
    .addModel(taskModel)
    .addModel(organisation)
    .addModel(youngPersonModel)
    // Departments can be used to create stories for dev, design, sales etc
    .addDepartment(new Department({ name: 'developer' }))
    .addDepartment(new Department({ name: 'designer' }))
    .addDepartment(new Department({ name: 'sales' }))
    .addStory(firstUserStory)
    // Can also add custom stories in line
    .addStory(
      new UserStory({ asA: admin, iWant: 'to be able to code a story', soICan: 'Easily create stories using code' }),
    )
    // Calling this will generate stories for each user type based on their permissions
    .generateCrudStories()
    .create();

  console.log('project', project);
  expect(project.name).toBe('Fabric');
});
