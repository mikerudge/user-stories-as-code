# Full Example

Ok I think we have enough information to actually generate stories based on model and permissions. Let look at a full example.

```typescript
// Define the different user types in the project
const admin = new UserType({ name: 'Admin' });
const businessOwner = new UserType({ name: 'Business Owner' });

// Define the different departments in the stories
const developers = new Department({ name: 'Developers' });

// Create the different epics for the project
const authEpic = new Epic({ name: 'Auth', description: 'Everything to do with auth' }).addMilestone(
  new Milestone({ name: 'Complete Auth', startDate: new Date(), endDate: new Date() }),
);

// Create a custom story
const firstUserStory = new UserStory()
  .setAsA(admin)
  .setIWant('to be able to create a new project')
  .setSoThat('I can start working on it')
  .addTask(new Task({ title: 'Create a new project' }))
  .addTask(new Task({ title: 'Setup github repo' }))
  .addEpic(authEpic)
  .addDepartment(developers);

const james = new TeamMember({ name: 'James ' });
firstUserStory.addAssignee(james);

// Models
const organisation = new Model({ name: 'Organisation' });
const userModel = new Model({ name: 'User' }).addPermission(new Permission({ userType: admin, actions: ['all'] }));
const authorModel = new Model({ name: 'Author' })
  .addUserType(admin)
  .addPermission(new Permission({ userType: admin, actions: ['read'], can: false }))
  .addPermission(new Permission({ userType: businessOwner, actions: ['read'], belongsTo: 'owner' }));
const taskModel = new Model({ name: 'Task' }).addPermission(new Permission({ userType: admin, actions: ['all'] }));
const bookModel = new Model({ name: 'Book' });

// An example of a task for a project
const projectTask = new Task({ title: 'Invite the team to the repo' }).addAssignee(james);

// Create a new project that puts it all together
const project = new Project({ name: 'Awesome Sauce' })
  .addStory(
    new UserStory({ asA: admin, iWant: 'to be able to code a story', soICan: 'Easily create stories using code' }),
  )
  .addStory(firstUserStory)
  .addMilestone(new Milestone({ name: 'First Milestone' }))
  .addTask(projectTask);

const stories = new CRUDStories()
  .addModel(organisation)
  .addModel([userModel, authorModel, taskModel, bookModel])
  .generate();

project.addStories(stories);

const finished = project.output();
```

PHEW quite a bit of code but for all that work, we get an entire project structure that we can use tp automate setting up the project, and generating the user stories, which can then be used to automatically setup docs (Google sheets) and even setup the project in Jira.

```json
{
  "id": "enfwtx6tnkvpuq97o",
  "name": "Awesome Sauce",
  "stories": [
    {
      "id": "enfwtx6tnkvpuq97p",
      "summary": "As a Admin, I want to to be able to code a story, so I can Easily create stories using code",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq97c",
      "summary": "As a Admin, I want to to be able to create a new project, so I can I can start working on it",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq97q",
      "summary": "As a Admin, I want to Create Users, so I can create a new record",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq97s",
      "summary": "As a Admin, I want to List all Users, so I can easily navigate",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq97t",
      "summary": "As a Admin, I want to See a single User, so I can see more in depth information",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq97u",
      "summary": "As a Admin, I want to to be able to link others directly to User, so I can share links on other platforms",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq97v",
      "summary": "As a Admin, I want to update Users, so I can change information",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq97w",
      "summary": "As a Admin, I want to delete Users, so I can remove unwanted Users",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq97x",
      "summary": "As a Admin, I want to List all Authors, so I can easily navigate",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq97y",
      "summary": "As a Admin, I want to See a single Author, so I can see more in depth information",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq97z",
      "summary": "As a Admin, I want to to be able to link others directly to Author, so I can share links on other platforms",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq981",
      "summary": "As a Business Owner, I want to to be able to view Authors that belong to me, so I can view all records",
      "userType": "Business Owner"
    },
    {
      "id": "enfwtx6tnkvpuq982",
      "summary": "As a Business Owner, I want to See a single Author if I am the owner, so I can see more in depth information",
      "userType": "Business Owner"
    },
    {
      "id": "enfwtx6tnkvpuq983",
      "summary": "As a Business Owner, I want to See a permission denied message for Author if I am not owner, so I can know I dont have access",
      "userType": "Business Owner"
    },
    {
      "id": "enfwtx6tnkvpuq984",
      "summary": "As a Business Owner, I want to to be able to link others directly to Author, so I can share links on other platforms",
      "userType": "Business Owner"
    },
    {
      "id": "enfwtx6tnkvpuq985",
      "summary": "As a Admin, I want to Create Tasks, so I can create a new record",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq987",
      "summary": "As a Admin, I want to List all Tasks, so I can easily navigate",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq988",
      "summary": "As a Admin, I want to See a single Task, so I can see more in depth information",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq989",
      "summary": "As a Admin, I want to to be able to link others directly to Task, so I can share links on other platforms",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq98a",
      "summary": "As a Admin, I want to update Tasks, so I can change information",
      "userType": "Admin"
    },
    {
      "id": "enfwtx6tnkvpuq98b",
      "summary": "As a Admin, I want to delete Tasks, so I can remove unwanted Tasks",
      "userType": "Admin"
    }
  ]
}
```
