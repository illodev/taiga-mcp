---
name: backlog-grooming
description: "Groom and refine Taiga backlogs using MCP tools. Use when: creating user stories, ordering backlog, managing epics, linking stories to epics, setting story points, bulk creating stories, filtering and prioritizing the backlog, moving stories between backlog and kanban."
argument-hint: "Describe the backlog task (e.g. 'create 5 user stories for the authentication epic')"
---

# Backlog Grooming

Create, organize, and refine user stories and epics in the Taiga backlog.

## When to Use

- Creating or refining user stories
- Organizing stories into epics
- Setting story points and priorities
- Reordering the backlog
- Bulk creating stories from a feature breakdown
- Moving stories between backlog and kanban views

## Procedure

### 1. Review Current Backlog

```
taiga_userstories_list       → filter by project (milestone=null for unassigned)
taiga_epics_list             → list epics for the project
taiga_userstories_filters_data → available filter options
```

### 2. Create Epics for Feature Areas

```
taiga_epics_create           → project, subject, description, color, tags
taiga_epics_bulk_create      → create multiple epics from newline-separated subjects
```

### 3. Create User Stories

Single story with details:

```
taiga_userstories_create     → project, subject, description, tags, assigned_to, status, points (per role)
```

Bulk creation:

```
taiga_userstories_bulk_create → project_id, bulk_stories (newline-separated subjects)
```

### 4. Link Stories to Epics

```
taiga_epics_related_userstories_add          → epic_id, userstory_id
taiga_epics_related_userstories_bulk_create  → epic_id, project_id, bulk_userstories (array of IDs)
taiga_epics_related_userstories_list         → verify links
```

### 5. Set Story Points

Update points per role on each story:

```
taiga_userstories_update     → set points object: { "role_id": point_id }
taiga_points_list            → get available point values and their IDs
```

### 6. Order the Backlog

```
taiga_userstories_bulk_update_backlog_order  → reorder stories by priority
taiga_userstories_bulk_update_kanban_order   → reorder in kanban view
```

### 7. Refine and Tag

```
taiga_userstories_update     → add/update tags, description, acceptance criteria
taiga_projects_create_tag    → create new tags if needed
```

## Tips

- Use `milestone=null` filter to find stories not yet planned for any sprint
- Points are set per role — use `taiga_points_list` to get the mapping of value → ID
- Bulk create assigns default status — update stories individually for refinement
- Use epics to group related stories; one story can belong to multiple epics
- Filter by `tags` or `role` to focus grooming sessions on specific areas
