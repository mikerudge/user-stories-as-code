import Platform from '../platform';
import Project from '../project';
import UserStory from '../userStory';

it('allows name to be set', () => {
  const platform = new Platform({ name: 'Platform Test' });

  expect(platform.name).toBe('Platform Test');

  const platform2 = new Platform().setName('Platform Test 2');
  expect(platform2.name).toBe('Platform Test 2');

  const outputtedPlatform = platform2.output();
  expect(outputtedPlatform.name).toBe('Platform Test 2');
  // Check id is auto generated
  expect(platform2.id).toBeDefined();
  expect(outputtedPlatform.id).toBeDefined();
});

it('allows user story to be added', () => {
  const platform = new Platform({ name: 'Platform Test' });

  const userStory = new UserStory({ iWant: 'User Story Test' });
  expect(platform.userStories.size).toBe(0);
  platform.addStory(userStory);
  expect(platform.userStories.size).toBe(1);
  const story = Array.from(platform.userStories)?.[0];

  expect(story?.platform?.id).toBe(platform.id);
});

it('platform user stories should be added to the project', () => {
  const platform = new Platform({ name: 'Platform Test' });

  const userStory = new UserStory({ iWant: 'User Story Test' });
  expect(platform.userStories.size).toBe(0);
  platform.addStory(userStory);
  expect(platform.userStories.size).toBe(1);

  const project = new Project({ name: 'Project Test' });
  expect(project.stories.size).toBe(0);
  project.addPlatform(platform);
  expect(project.stories.size).toBe(1);
});
