---
sidebar_position: 3
---

# Create a User Type

User types allow you to specify all the different user types in the project. For example, `admins`, `authors`, `readers` etc.

lets create our admin user

```typescript
const adminUser = new UserType({ name: 'Admin' });
```

## Permissions

User types can also have permissions, check the [permission docs](../CRUDStories/create-a-permission).
