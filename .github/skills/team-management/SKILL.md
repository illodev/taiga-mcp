---
name: team-management
description: "Manage Taiga project teams using MCP tools. Use when: inviting members, assigning roles, managing permissions, bulk inviting users, removing members, reviewing team composition, configuring role permissions."
argument-hint: "Describe the team change (e.g. 'invite 3 developers and assign them the Developer role')"
---

# Team Management

Manage project memberships, roles, and permissions in Taiga.

## When to Use

- Inviting new members to a project
- Assigning or changing member roles
- Configuring role permissions
- Bulk inviting team members
- Removing members from a project
- Auditing team composition

## Procedure

### 1. Review Current Team

```
taiga_memberships_list       → list all members (filter by project, role)
taiga_roles_list             → list available roles in the project
taiga_users_list             → list users in a project
```

### 2. Configure Roles

Create or update roles before inviting members:

```
taiga_roles_create           → name, permissions[], computable, order
taiga_roles_update           → modify permissions or properties
taiga_roles_delete           → remove unused roles
```

**Common permissions**: `view_project`, `add_us`, `modify_us`, `add_task`, `modify_task`, `add_issue`, `modify_issue`, `view_wiki`, `add_wiki`

### 3. Invite Members

Single invite:

```
taiga_memberships_create     → project, role_id, username (email or username)
```

Bulk invite:

```
taiga_memberships_bulk_create → project_id, bulk_memberships: [{role_id, username}, ...]
```

### 4. Manage Existing Members

```
taiga_memberships_get        → get membership details
taiga_memberships_update     → change role assignment
taiga_memberships_delete     → remove member from project
```

### 5. Review Member Activity

```
taiga_users_stats            → user contribution statistics
taiga_users_contacts         → user's contacts list
taiga_projects_member_stats  → project-level member statistics
```

## Tips

- Set `computable: true` on roles that should count for story point estimates
- Use `taiga_memberships_bulk_create` for onboarding multiple team members at once
- Check `taiga_roles_list` to get valid role IDs before inviting
- Permissions are an array of strings — check Taiga docs for the full permission list
