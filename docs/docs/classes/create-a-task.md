---
sidebar_position: 6
---

# Create a Task

A task is for when the format of a user story doesn't make sense. For example you might have a task on the project for setting up the GitHub repo.

```typescript
const task = new Task({ title: 'Create GitHub repo', description: '', status: '', priority: 2 });
```

## Adding a task to project

```typescript
const project = new Project().addTask(task);
```

## Adding a task to a user story

```typescript
const userStory = new UserStory().addTask(task);
```

## Assigning a task to a team member

You can assign a single or multiple team members to a task.

```typescript
const james = new TeamMember({ id: '123', name: 'James Brown', role: 'Developer' });

const task = new Task({ ... }).setAssignee(james);
```

Wow team members!!? That's right! Find out more next!
