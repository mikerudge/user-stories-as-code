---
sidebar_position: 6
---

# Create a Milestone

Creating a milestone allows you to set a start date and end date onto the `Project` and `Epic` classes.

```typescript
const milestone = new Milestone({ startDate: new Date(), endDate: new Date(), name: 'Finish the goal' });
// You can add milestones to epics
const epic = new Epic({ ... }).addMilestone(milestone);

// Or you can add milestones directly to the project.
const project = new Project({ ... }).addMilestone(milestone);
```

### Note

Milestones that are added to an `Epic` will automatically be added to the project as well so there is no need to add the milestones to both a project AND an epic, just add it to the epic.

## Params

```typescript
type MilestoneParams = {
  name?: string;
  startDate?: Date;
  endDate?: Date;
};
```
