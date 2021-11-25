import { Permission } from '..';
import Department from '../department';
import Epic from '../epic';
import Platform from '../platform';
import Sprint from '../sprint';
import Task from '../task';
import TeamMember from '../teamMember';
import UserStory from '../userStory';
import UserType from '../userType';

it('can set iWant', () => {
  const userStory = new UserStory();
  userStory.setIWant('test');
  expect(userStory.iWant).toBe('test');

  const userStory2 = new UserStory({ iWant: 'test2' });
  expect(userStory2.iWant).toBe('test2');

  const userStory3 = new UserStory({ iWant: 'test3' });
  userStory3.iWant = 'test4';
  expect(userStory3.iWant).toBe('test4');
});

it('can set soICan', () => {
  const userStory = new UserStory();
  userStory.setSoICan('test');
  expect(userStory.soICan).toBe('test');

  const userStory2 = new UserStory({ soICan: 'test2' });
  expect(userStory2.soICan).toBe('test2');

  const userStory3 = new UserStory({ soICan: 'test3' });
  userStory3.soICan = 'test4';
  expect(userStory3.soICan).toBe('test4');
});

it('can set epic', () => {
  const userStory = new UserStory();
  const epic = new Epic();
  userStory.setEpic(epic);
  expect(userStory.epic).toBe(epic);
  const epic2 = new Epic();
  const userStory2 = new UserStory({ epic: epic2 });
  expect(userStory2.epic).toBe(epic2);

  const epic3 = new Epic();
  userStory2.epic = epic3;
  expect(userStory2.epic).toBe(epic3);
});

it('can set platform', () => {
  const userStory = new UserStory();
  const platform = new Platform();
  userStory.setPlatform(platform);
  expect(userStory.platform).toBe(platform);
  const platform2 = new Platform();
  const userStory2 = new UserStory({ platform: platform2 });
  expect(userStory2.platform).toBe(platform2);

  const platform3 = new Platform();
  userStory2.platform = platform3;
  expect(userStory2.platform).toBe(platform3);
});
it('can set sprint', () => {
  const userStory = new UserStory();
  const sprint = new Sprint();
  userStory.setSprint(sprint);
  expect(userStory.sprint).toBe(sprint);
  const sprint2 = new Sprint();
  const userStory2 = new UserStory({ sprint: sprint2 });
  expect(userStory2.sprint).toBe(sprint2);

  const sprint3 = new Sprint();
  userStory2.sprint = sprint3;
  expect(userStory2.sprint).toBe(sprint3);
});

it('can set dueDate', () => {
  const now1 = new Date('2020-10-09');
  const userStory = new UserStory({ dueDate: now1 });
  expect(userStory.dueDate).toBe(now1);
  const now = new Date();
  userStory.setDueDate(now);
  expect(userStory.dueDate).toBe(now);
  userStory.dueDate = now1;
  expect(userStory.dueDate).toBe(now1);
});

it('can set asA', () => {
  const userType = new UserType({ name: 'user type test' });
  const userStory = new UserStory({ asA: userType });
  expect(userStory.asA).toBe(userType);
  const userType2 = new UserType({ name: 'user type test 2' });
  const userStory2 = new UserStory().setAsA(userType2);
  expect(userStory2.asA).toBe(userType2);
  const userType3 = new UserType({ name: 'user type test 3' });
  const userStory3 = new UserStory();
  userStory3.asA = userType3;
  expect(userStory3.asA).toBe(userType3);
});

it('can set points', () => {
  const userStory = new UserStory({ points: 10 });
  expect(userStory.points).toBe(10);

  const userStory2 = new UserStory().setPoints(5);
  expect(userStory2.points).toBe(5);

  const userStory3 = new UserStory();
  userStory3.points = 8;
  expect(userStory3.points).toBe(8);
});

it('can set key', () => {
  const userStory = new UserStory({ key: 'TST' });
  expect(userStory.key).toBe('TST');

  const userStory2 = new UserStory().setKey('tster');
  expect(userStory2.key).toBe('tster');

  const userStory3 = new UserStory();
  userStory3.key = 'ABLETER';
  expect(userStory3.key).toBe('ABLETER');
});

it('can set labels', () => {
  const userStory = new UserStory({ labels: ['test1', 'test2'] });
  expect(userStory.labels).toEqual(new Set(['test1', 'test2']));
  userStory.addLabel('test3');
  expect(userStory.labels).toEqual(new Set(['test1', 'test2', 'test3']));
  userStory.addLabel(['test4', 'test5']).addLabel('test5');
  expect(userStory.labels).toEqual(new Set(['test1', 'test2', 'test3', 'test4', 'test5']));
  expect(userStory?.labels?.size).toBe(5);

  userStory.setAsA(new UserType({ name: 'user type test' }));
  const out = userStory.output();
  expect(out.labels?.length).toBe(5);
  expect(out.labels).toContain('test1');
  expect(out.labels).toContain('test2');
  expect(out.labels).toContain('test3');
  expect(out.labels).toContain('test4');
  expect(out.labels).toContain('test5');
});

it('can create a summary', () => {
  const userType = new UserType({ name: 'user type test' });
  const userStory = new UserStory({ asA: userType, iWant: 'to pass test', soICan: 'believe' });
  expect(userStory.summary).toBe('As a user type test, I want to pass test, so I can believe');
  const userStory2 = new UserStory({ asA: userType, iWant: 'to pass test' });
  expect(userStory2.summary).toBe('As a user type test, I want to pass test');
  const userStory3 = new UserStory({ asA: userType }).setIWant('to pass test');
  expect(userStory3.summary).toBe('As a user type test, I want to pass test');
  userStory3.setSoICan('believe');
  userStory3.setIWant('to watch tv');
  userStory3.setSoICan('keep up to date');
  expect(userStory3.summary).toBe('As a user type test, I want to watch tv, so I can keep up to date');
});

it('can add departments', () => {
  const department = new Department();
  const department2 = new Department();
  const userStory = new UserStory({ departments: [department] });
  userStory.addDepartment(department2);
  expect(userStory.departments.size).toBe(2);
});

it('can add tasks', () => {
  const task = new Task();
  const task2 = new Task();
  const userStory = new UserStory({ tasks: [task] });
  userStory.addTask(task2);
  // Should dedupe this task
  userStory.addTask(task2);
  expect(userStory.tasks.size).toBe(2);
});

it('can set assignee', () => {
  const assignee = new TeamMember({ name: 'test' });
  const teamMember = new TeamMember({ name: 'test' });
  const userStory = new UserStory({ assignee: [assignee] });
  userStory.addAssignee(teamMember);

  expect(userStory.assignee.size).toBe(2);
});

it('can set asA with a permission', () => {
  const admin = new UserType({ name: 'Admin' }).addPermission(new Permission({ actions: ['all'] }));

  const userStory = new UserStory({ asA: admin });

  expect(userStory.asA).toBe(admin);
});

it('can output to json', () => {
  const assignee = new TeamMember({ name: 'test' });
  const teamMember = new TeamMember({ name: 'test' });
  const admin = new UserType({ name: 'Admin' }).addPermission(new Permission({ actions: ['all'] }));

  const userStory = new UserStory({
    assignee: [assignee],
    iWant: 'to pass test',
    soICan: 'believe',
    asA: new UserType({ name: 'user type test' }),
  });

  const epic = new Epic({ name: 'Test Epic' });
  const userStory2 = new UserStory({
    assignee: [assignee],
    iWant: 'to pass test',
    soICan: 'believe',
    asA: admin,
  }).setEpic(epic);

  userStory.addAssignee(teamMember);
  const out = userStory.output();
  expect(out.id).toBeDefined();

  const out2 = userStory2.output();
  expect(out2.id).toBeDefined();
  expect(out2?.epic?.id).toBeDefined();
});
