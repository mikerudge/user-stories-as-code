---
sidebar_position: 3
---

# Create a User Type

User types allow you to specify all the different user types in the project. For example, `admins`, `authors`, `readers` etc.

lets create our admin user

```typescript
const adminUser = new UserType({ name: 'Admin' });
```

## Adding permissions

For each user type you can add default permissions on each user.

```typescript
const restrictedUser = new UserType({ name: 'RestrictedUser' }).addPermissions({
  actions: ['read'],
  condition: 'owner',
});
```
