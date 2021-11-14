---
sidebar_position: 5
---

# Create a Epic

Creating an epic allows you to group your user stories. First start by creating your epic.

```typescript
const epic = new Epic({ name: '' });
```

then you can attach it to your user stories

```typescript
const story = new UserStory({...}).addEpic(epic)
```

### Note

You can also add epics to the `Project` however, when adding a `story` to a project, the epic on the story will be added at the same time so there is no need to add them twice.

## Params

```typescript
type EpicProps = {
  name: string;
  description?: string;
  color?: string;
  milestone?: Milestone;
};
```
