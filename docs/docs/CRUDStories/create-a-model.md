---
sidebar_position: 2
---

# Create a Model

You can think of models as collections in MongoDB or tables in SQL. They are at a high level the major data points, for example `users` `books` `comments`

```typescript
const booksModel = new Model({ name: 'Book' });
```

## Permissions

Each model needs to know the `permissions` to understand what stories to generate. The permissions are checked when generating the story, for example, if a `reader` userType has a permission to `read` the `book` model, then the user story generated might be something like

- `As a reader, I want to be able to list books, so I can find a book easily`
- `As a reader, I want to be able to see a single book`
- `As a reader, I want to be able to link directly to a single book`

You can add permissions directly to the model like below.

```typescript
const permission = new Permission({ userType: admin, actions: ['all'] });
const userModel = new Model({ name: 'User' }).addPermission(permission);
```

Or if you add a user type with default permissions it can use those. For example adding an `admin` user which always has the same permissions.

```typescript
const admin = new UserType({ name: 'Admin' }).addPermission({
  actions: ['all'],
});

const userModel = new Model({ name: 'User' }).addUserType(admin);
```

Check out the next section to see examples of permissions
