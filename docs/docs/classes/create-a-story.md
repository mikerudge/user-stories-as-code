---
sidebar_position: 2
---

# Create a Story

A story is made up of three main elements, who, what and why. These will be used to generate a summary.

```typescript
const firstStory = new UserStory({
  asA: admin,
  iWant: 'to be able to code a story',
  soICan: 'Easily create stories using code',
});
```

then to add that user story to the project you can simply

```typescript
project.addStory(firstStory);
```

You can also use the chained methods to compose the user story

```typescript
const story = new UserStory()
  .AsA(admin)
  .IWant('to be able to create a new project')
  .SoThat('I can start working on it');
```

## Tasks

A user story can also have sub tasks. First create a task like so

```typescript
const task = new Task({ name: 'Create a new project' });
```

then add it to the story.

```typescript
story.addTask(task);
```

Nice, but what is `admin`?
