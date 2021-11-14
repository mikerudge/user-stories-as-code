---
sidebar_position: 1
---

# Creating the CRUD Generator

To start generating crud stories, first create a generator and pass in the project you want the stories added to.

```typescript
import { CRUDStories } from '@mikerudge/usac';

new CRUDStories();
```

Now you add models to the generator.

```typescript
new CRUDStories().addModel(organisation)
// Add models also accepts multiple models
.addModel([userModel, authorModel, taskModel, bookModel]);

// Or alternatively pass them in on initialisation
new CRUDStories({models: [organisation, authorModel, ...]})

```

then once you have added all your models, call the `generate()` method to compile the models into stories. Once you have the stories, you can simply add them to the project like so.

```typescript
const stories = new CRUDStories({models: [...]}).generate();
const project = new Project().addStory(stories);
```

Check out the next section to find out more about models.
