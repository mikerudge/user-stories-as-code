import Department from '../department';
import { Epic } from '../epic';
import Milestone from '../milestone';
import { Platform } from '../platforms';
import Project from '../project';
import Sprint from '../sprint';
import TeamMember from '../teamMember';
import UserStory from '../userStory';
import UserType from '../userType';
it('allows name to be set', () => {
  const project = new Project({ name: 'Project Test' });

  expect(project.name).toBe('Project Test');

  const outputtedProject = project.output();
  expect(outputtedProject.name).toBe(project.name);
  // Check id is auto generated
  expect(project.id).toBeDefined();
  expect(outputtedProject.id).toBeDefined();
});

it('allows departments to be added', () => {
  const department1 = new Department({ name: 'Department Test' });
  const department2 = new Department({ name: 'Department Test 2' });
  const department3 = new Department({ name: 'Department Test 3' });
  const project = new Project({ name: 'Project Test', departments: [department1, department2] });

  expect(project.departments.size).toBe(2);
  project.addDepartment(department3);
  expect(project.departments.size).toBe(3);

  // Should de duplicate the department
  project.addDepartment(department1);
  expect(project.departments.size).toBe(3);

  const outputtedProject = project.output();
  expect(outputtedProject.departments.length).toBe(3);
  expect(outputtedProject.totalDepartments).toBe(3);
});

it('allows addKey to be added', () => {
  const project = new Project({ name: 'Project Test', key: 'test' });

  expect(project.key).toBe('test');

  const project2 = new Project({ name: 'Project Test 2' }).setKey('test2');
  expect(project2.key).toBe('test2');
});

test('allows milestones to be added', () => {
  const project = new Project({ name: 'Project Test' });

  const milestone = new Milestone({ name: 'Milestone Test' });
  project.addMilestone(milestone);
  expect(project.milestones.size).toBe(1);
});

test('can set the owner of a project', () => {
  const project = new Project({ name: 'Project Test' });
  const owner = new TeamMember({ name: 'Owner' });
  project.setOwner(owner);
  expect(project.owner).toBe(owner);

  const project2 = new Project({ name: 'Project Test 2', owner: owner });
  expect(project2.owner).toBe(owner);
});

test('allows platforms to be added', () => {
  const platform1 = new Platform({ name: 'Platform Test' });
  const platform2 = new Platform({ name: 'Platform Test 2' });
  const project = new Project({ name: 'Project Test', platforms: [platform1, platform2] });

  expect(project.platforms.size).toBe(2);
  const platform3 = new Platform({ name: 'Platform Test 3' });
  project.addPlatform(platform3);
  expect(project.platforms.size).toBe(3);

  const platform4 = new Platform({ name: 'Platform Test 4' });
  const platform5 = new Platform({ name: 'Platform Test 5' });
  project.addPlatform([platform4, platform5]);
  expect(project.platforms.size).toBe(5);

  project.addPlatform(platform1);
  expect(project.platforms.size).toBe(5);

  const outputtedProject = project.output();

  // By calling .length we are testing if the array is not a Set
  expect(outputtedProject.platforms.length).toBe(5);
});

test('allows userTypes to be added', () => {
  const UserType1 = new UserType({ name: 'UserType Test' });
  const UserType2 = new UserType({ name: 'UserType Test 2' });
  const project = new Project({ name: 'Project Test', userTypes: [UserType1, UserType2] });

  expect(project.userTypes.size).toBe(2);
  const UserType3 = new UserType({ name: 'UserType Test 3' });
  project.addUserType(UserType3);
  expect(project.userTypes.size).toBe(3);

  const UserType4 = new UserType({ name: 'UserType Test 4' });
  const UserType5 = new UserType({ name: 'UserType Test 5' });
  project.addUserType([UserType4, UserType5]);
  expect(project.userTypes.size).toBe(5);

  project.addUserType(UserType1);
  expect(project.userTypes.size).toBe(5);

  const outputtedProject = project.output();

  // By calling .length we are testing if the array is not a Set
  expect(outputtedProject.userTypes.length).toBe(5);
});

it('allows sprints to be added', () => {
  expect(new Project({ name: 'Project Test' }).sprints.size).toBe(0);

  const sprint1 = new Sprint({
    name: 'Sprint Test',
    startDate: new Date('2020-01-01'),
    endDate: new Date('2020-01-02'),
  });
  const sprint2 = new Sprint({
    name: 'Sprint Test 2',
    startDate: new Date('2020-01-03'),
    endDate: new Date('2020-01-04'),
  });
  const project = new Project({ name: 'Project Test', sprints: [sprint1, sprint2] });
  expect(project.sprints.size).toBe(2);
  const sprint3 = new Sprint({
    name: 'Sprint Test 3',
    startDate: new Date('2020-01-05'),
    endDate: new Date('2020-01-06'),
  });
  project.addSprint(sprint3);
  // Should de-duplicated these sprints
  project.addSprint([sprint2, sprint1]);

  expect(project.sprints.size).toBe(3);
});

it('allows epics to be added', () => {
  const project = new Project({ name: 'Project Test' });
  expect(project.epics.size).toBe(0);

  const epic1 = new Epic({ name: 'Epic Test' });
  const epic2 = new Epic({ name: 'Epic Test 2' });
  project.addEpic(epic1);
  project.addEpic(epic2);
  expect(project.epics.size).toBe(2);

  const project2 = new Project({ name: 'Project Test 2', epics: [epic1, epic2] });
  expect(project2.epics.size).toBe(2);
});
