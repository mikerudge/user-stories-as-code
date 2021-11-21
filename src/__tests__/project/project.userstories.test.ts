import Department from '../../department';
import Epic from '../../epic';
import Platform from '../../platform';
import Project from '../../project';
import Sprint from '../../sprint';
import TeamMember from '../../teamMember';
import UserStory from '../../userStory';
import UserType from '../../userType';

describe('allows userStories to be added', () => {
  it('allows userStories to be added', () => {
    const project = new Project({ name: 'Project Test' });

    const userType = new UserType({ name: 'User Type Test' });
    const userStory = new UserStory({ asA: userType, iWant: 'test', soICan: 'test' });
    project.addStory(userStory);
    expect(project.stories.size).toBe(1);
  });
  it('adds the user type to the project', () => {
    const project = new Project({ name: 'Project Test' });

    const userType = new UserType({ name: 'User Type Test' });
    const userStory = new UserStory({ asA: userType, iWant: 'test', soICan: 'test' });
    project.addStory(userStory);
    expect(project.userTypes.size).toBe(1);
  });

  it('adds the assignee to the project', () => {
    const project = new Project({ name: 'Project Test' });

    const userStory = new UserStory({ iWant: 'test', soICan: 'test' }).addAssignee(new TeamMember({ name: 'Test' }));
    project.addStory(userStory);
    expect(project.teamMembers.size).toBe(1);
  });

  it('adds the sprint to the project', () => {
    const project = new Project({ name: 'Project Test' });

    const userStory = new UserStory({ iWant: 'test', soICan: 'test' }).setSprint(
      new Sprint({ name: 'Test', startDate: new Date(), endDate: new Date() }),
    );
    project.addStory(userStory);
    expect(project.sprints.size).toBe(1);
  });

  it('adds the epic to the project', () => {
    const project = new Project({ name: 'Project Test' });
    const epic = new Epic({ name: 'Epic Test' });
    const userStory = new UserStory({ iWant: 'test', soICan: 'test' }).setEpic(epic);
    project.addStory(userStory);
    expect(project.epics.size).toBe(1);
  });

  it('adds the departments to the project', () => {
    const project = new Project({ name: 'Project Test' });
    const department = new Department({ name: 'Department Test' });
    const userStory = new UserStory({ iWant: 'test', soICan: 'test' }).addDepartment(department);
    project.addStory(userStory);
    expect(project.departments.size).toBe(1);
  });

  it('adds the all the story info to the project', () => {
    const project = new Project({ name: 'Project Test' });
    const epic = new Epic({ name: 'Epic Test' });
    const sprint = new Sprint({ name: 'Sprint Test', startDate: new Date(), endDate: new Date() });
    const assignee = new TeamMember({ name: 'Test' });
    const userType = new UserType({ name: 'User Type Test' });
    const department = new Department({ name: 'Department Test' });
    const platform = new Platform({ name: 'Platform Test' });
    const userStory = new UserStory({ asA: userType, iWant: 'test', soICan: 'test' })
      .addDepartment(department)
      .setEpic(epic)
      .setSprint(sprint)
      .addAssignee(assignee)
      .setPlatform(platform);

    const userStory2 = new UserStory({ asA: userType, iWant: 'test', soICan: 'test' })
      .addDepartment(department)
      .setEpic(epic)
      .setSprint(sprint)
      .addAssignee(assignee)
      .setPlatform(platform);

    project.addStory(userStory).addStory(userStory2);
    expect(project.stories.size).toBe(2);
    expect(project.departments.size).toBe(1);
    expect(project.epics.size).toBe(1);
    expect(project.sprints.size).toBe(1);
    expect(project.teamMembers.size).toBe(1);
    expect(project.userTypes.size).toBe(1);
    expect(project.platforms.size).toBe(1);

    // Get the first user type from the project Set and check if it has the correct name
    const userTypeFromProject = project.userTypes.values().next().value;
    expect(userTypeFromProject.name).toBe(userType.name);
  });

  it('user stories should adopt the key from the project', () => {
    const project = new Project({ name: 'Project Test', key: 'AWE' });
    const userStory = new UserStory({ iWant: 'test', soICan: 'test' });

    project.addStory(userStory);
    expect(project.stories.size).toBe(1);

    const story = project.stories.values().next().value;
    expect(story.key).toBe('AWE-1');
  });
});
