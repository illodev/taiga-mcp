---
name: sprint-planning
description: "Plan and manage Taiga sprints using MCP tools. Use when: creating sprints/milestones, assigning user stories to sprints, setting sprint dates, checking sprint burndown stats, reordering sprint backlog, reviewing sprint progress."
argument-hint: "Describe your sprint planning goal (e.g. 'create a 2-week sprint with these stories')"
---

# Sprint Planning

Plan, create, and manage sprints (milestones) in Taiga, including story assignment and progress tracking.

## When to Use

- Creating a new sprint/milestone with dates and capacity
- Moving user stories into a sprint
- Reordering stories within a sprint
- Reviewing sprint burndown and statistics
- Closing or updating a sprint

## Procedure

### 1. Identify the Project

Resolve the project first — you need the project ID for all operations:

```
taiga_projects_list          → browse projects
taiga_projects_get_by_slug   → resolve by slug
taiga_resolver_project       → resolve slug to ID
```

### 2. Review Current Sprints

Check existing milestones to understand current state:

```
taiga_milestones_list        → list all sprints (filter by closed: true/false)
taiga_milestones_stats       → get burndown data for a sprint
```

### 3. Create a New Sprint

Create milestone with name, dates, and estimated capacity:

```
taiga_milestones_create      → name, estimated_start, estimated_finish, disponibility (story points)
```

**Required fields**: project, name, estimated_start (YYYY-MM-DD), estimated_finish (YYYY-MM-DD)

### 4. Populate the Sprint

Add user stories to the sprint:

```
taiga_userstories_list       → review backlog (filter: milestone=null for unassigned)
taiga_userstories_update     → set milestone field to assign story to sprint
taiga_userstories_bulk_update_sprint_order → reorder stories within the sprint
```

### 5. Monitor Progress

Track sprint execution:

```
taiga_milestones_stats       → total points, completed points, burndown
taiga_tasks_list             → filter by milestone to see sprint tasks
taiga_milestones_get         → full sprint details including closed status
```

### 6. Close the Sprint

```
taiga_milestones_update      → set closed: true when sprint is complete
```

## Tips

- Use `disponibility` on milestone creation to set the team's available story points
- Filter `taiga_userstories_list` with `milestone=null` to find stories not yet assigned to any sprint
- Use `taiga_milestones_stats` for burndown data including days-by-day breakdown
- Stories can be reordered within a sprint using `taiga_userstories_bulk_update_sprint_order`
