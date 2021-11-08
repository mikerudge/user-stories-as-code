---
sidebar_position: 1
---

# Tutorial Intro

Let's start writing some user stories.

## Getting Started

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

## Tasks

A user story can also have sub tasks. First create a story like so

```typescript
const task = new Task({ name: 'Create a new project' });
```

then add it to the story.

```typescript
story.addTask(task);
```

## Departments

Departments are different parts of your business that will be using the user stories. For example, `developers` `sales` `design`

```typescript
const developers = new Department({ name: 'Developers' });
```

## Generating CRUD Stories

Using the information we have above we can almost automatically generate user stories, just one last piece, models!

### Models

Think of models as, collections in MongoDB or tables in SQL. They are at a high level the major data points, for example `users` `books` `comments`

```typescript
const userModel = new Model({ name: 'User' });
```
