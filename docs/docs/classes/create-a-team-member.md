# Create a Team Member

A team member is a member of the team (funny that!), that can be assigned to a `task`, a `story` or a `project`

```typescript
const james = new TeamMember({ id: '123', name: 'James Brown', role: 'Developer' });
```

## Setting the owner of a project

```typescript
new Project().setOwner(james);
```

## Setting the assignee of a task

```typescript
new Task().addAssignee(james);
```

## Setting the assignee of a story

```typescript
new Story().addAssignee(james);
// Or set many
new Story().addAssignee([james, lisa]);
```

### Note:

When you add stories with a team member to a project, the project will also get the team member added.

## Props

```typescript
type Props = {
  id?: string;
  name: string;
  role?: string;
  avatar?: string;
};
```
