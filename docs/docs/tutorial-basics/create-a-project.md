---
sidebar_position: 1
---

# Create a Project

Lets start by creating a new project that will hold all the user stories (and more)

```typescript
import { Project } from '@mikerudge/usac';

const project = new Project({ name: 'test' });
```

## Adding components

You can now add top level resources to the project including

- stories
- user types
- departments
- models
- platforms
- epics
- milestones (coming soon)
