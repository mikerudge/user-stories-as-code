import Department from '../department';
import { Epic } from '../epic';
import Project from '../index';
import { Model } from '../model';
import Permission from '../permission';
import Task from '../task';
import UserStory from '../userStory';
import UserType from '../userType';
import CRUDStories from '../CRUDStories';
import Milestone from '../milestone';
import TeamMember from '../teamMember';

it('Create a new project', () => {
  // Define the different user types in the project
  const admin = new UserType({ name: 'Admin' });
  const businessOwner = new UserType({ name: 'Business Owner' });

  // Define the different departments in the stories
  const developers = new Department({ name: 'Developers' });

  // Create the different epics for the project
  const authEpic = new Epic({ name: 'Auth', description: 'Everything to do with auth' }).addMilestone(
    new Milestone({ name: 'Complete Auth', startDate: new Date(), endDate: new Date() }),
  );

  // Create a custom story
  const firstUserStory = new UserStory()
    .setAsA(admin)
    .setIWant('to be able to create a new project')
    .setSoThat('I can start working on it')
    .addTask(new Task({ title: 'Create a new project' }))
    .addTask(new Task({ title: 'Setup github repo' }))
    .setEpic(authEpic)
    .addDepartment(developers);

  const james = new TeamMember({ name: 'James ' });
  firstUserStory.setAssignee(james);

  // Models
  const organisation = new Model({ name: 'Organisation' });
  const userModel = new Model({ name: 'User' }).addPermission(new Permission({ userType: admin, actions: ['all'] }));
  const authorModel = new Model({ name: 'Author' })
    .addPermission(new Permission({ userType: admin, actions: ['read'], can: false }))
    .addPermission(new Permission({ userType: businessOwner, actions: ['read'], belongsTo: 'owner' }));
  const taskModel = new Model({ name: 'Task' }).addPermission(new Permission({ userType: admin, actions: ['all'] }));
  const bookModel = new Model({ name: 'Book' });

  // An example of a task for a project
  const projectTask = new Task({ title: 'Invite the team to the repo' }).setAssignee(james);

  // Create a new project that puts it all together
  const project = new Project({ name: 'Awesome Sauce' })
    .addStory(
      new UserStory({ asA: admin, iWant: 'to be able to code a story', soICan: 'Easily create stories using code' }),
    )
    .addStory(firstUserStory)
    .addMilestone(new Milestone({ name: 'First Milestone' }))
    .addTask(projectTask);

  const stories = new CRUDStories()
    .addModel(organisation)
    .addModel([userModel, authorModel, taskModel, bookModel])
    .generate();

  project.addStories(stories);

  const finished = project.output();

  expect(finished.name).toBe('Awesome Sauce');
});
