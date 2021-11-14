import { Model } from '../models';
import Project from '../project';
import Task from '../task';
import UserStory from '../userStory';
import UserType from '../userType';

it('should output a csv', () => {
  const restrictedUser = new UserType({ name: 'RestrictedUser' });

  const userModel = new Model({ name: 'User' });
  const todoModel = new Model({ name: 'Todo' });

  const story = new UserStory()
    .setAsA(restrictedUser)
    .setIWant('to read')
    .setSoThat('I can read')
    .addTask(new Task({ name: 'get a book' }));

  const project = new Project({ name: 'test' }).addStory(story);

  const csvStories = project.outputStories('csv');

  expect(csvStories).toBe(`name,type,read,write,create,delete,update`);
});
