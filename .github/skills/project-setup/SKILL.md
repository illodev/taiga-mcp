---
name: project-setup
description: "Set up and configure new Taiga projects using MCP tools. Use when: creating a new project, configuring statuses and workflows, creating tags, setting up roles and permissions, defining custom attributes, importing a project from JSON."
argument-hint: "Describe the project to create (e.g. 'set up a Scrum project for mobile app development')"
---

# Project Setup

Create and fully configure a new Taiga project with statuses, roles, tags, custom attributes, and team structure.

## When to Use

- Setting up a brand new project from scratch
- Configuring project workflows (statuses, types, priorities)
- Creating project tags and custom attribute schemas
- Importing a project from a JSON dump
- Cloning project configuration for a new team

## Procedure

### 1. Create the Project

```
taiga_projects_create        → name, description, is_backlog_activated, is_kanban_activated, is_issues_activated, is_wiki_activated
```

Enable the modules you need: backlog (Scrum), kanban, issues, wiki.

### 2. Configure Statuses

Set up workflows for each entity type:

```
taiga_userstory_statuses_list   → review defaults
taiga_userstory_statuses_create → add custom statuses (name, color, is_closed, order)
taiga_task_statuses_create      → task workflow statuses
taiga_issue_statuses_create     → issue workflow statuses
```

Reorder if needed:

```
taiga_userstory_statuses_bulk_update_order → set display order
taiga_task_statuses_bulk_update_order
taiga_issue_statuses_bulk_update_order
```

### 3. Configure Issue Types, Priorities, and Severities

```
taiga_issue_types_create     → Bug, Feature Request, Support, etc.
taiga_priorities_create      → Urgent, High, Medium, Low
taiga_severities_create      → Critical, Major, Normal, Minor, Trivial
taiga_points_create          → story point values (1, 2, 3, 5, 8, 13...)
```

### 4. Set Up Roles and Permissions

```
taiga_roles_list             → review default roles
taiga_roles_create           → name, permissions array, computable (for story points), order
taiga_roles_update           → modify permissions for existing roles
```

### 5. Create Tags

```
taiga_projects_create_tag    → tag name with optional HEX color
```

Common tag sets: `frontend`, `backend`, `design`, `devops`, `documentation`

### 6. Define Custom Attributes

For each entity type (epic, userstory, task, issue):

```
taiga_userstory_custom_attributes_create → name, type (text|multiline|richtext|date|url|dropdown|checkbox|number), description
taiga_epic_custom_attributes_create
taiga_task_custom_attributes_create
taiga_issue_custom_attributes_create
```

### 7. Invite Team Members

```
taiga_memberships_create     → role_id, username (by email or username)
taiga_memberships_bulk_create → invite multiple members at once
```

### 8. Alternative: Import from JSON

```
taiga_project_import         → import a complete project from JSON dump
```

## Tips

- `is_backlog_activated: true` enables Scrum mode; `is_kanban_activated: true` enables Kanban
- Story points are per-role via `computable: true` on the role — configure roles before points
- Custom attribute types: `text`, `multiline`, `richtext`, `date`, `url`, `dropdown`, `checkbox`, `number`
- Use `taiga_project_export` on an existing well-configured project to replicate its setup
