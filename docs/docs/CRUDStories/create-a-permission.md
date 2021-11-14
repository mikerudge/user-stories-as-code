---
sidebar_position: 3
---

# Create a Permission

A permission is used to give the generator more clues about the user types, and what each user is allowed to do.

UserTypes can be given default permissions, for example our admin user type should be able to `create` `read` `update` and `delete` everything in the project so lets add that in.

```typescript
const adminReadPermission = new Permission({ userType: admin, actions: ['read'], can: true });
```

## Set Deny Permission

All permission will default as a grant permission but you can also set them to `deny`

```typescript
adminUser.addPermissions({
  actions: ['all'],
  can: false,
});
```

## Set Owner Permission

The owner permission allows you to specify that only the owner of the model can do the action.

For example, if you want to only allow users to update their own profile

```typescript
new Permission({ userType: admin, actions: ['read'], condition: 'owner' });
```

## Add Permission To User Type

Adding permissions to a user type is a default way to set permissions on all models. For example if you want an 'admin' who can do everything on every model.

```typescript
adminUser.addPermissions({
  actions: ['create', 'read', 'update', 'delete'],
});

// Or you can just use 'all' as a helper
adminUser.addPermissions({
  actions: ['all'],
});
```

## Add Permission To Models

```typescript
const userModel = new Model({ name: 'User' }).addPermission(new Permission({ userType: admin, actions: ['all'] }));
```
