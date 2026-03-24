---
description: "Common Taiga workflow recipes and best practices. Use when: following agile workflows in Taiga, implementing Scrum or Kanban processes, managing end-to-end feature development, coordinating cross-entity operations."
---

# Taiga Workflow Recipes

## Scrum Sprint Workflow

### New Sprint Setup

```
1. taiga_milestones_create         → create sprint with dates and capacity
2. taiga_userstories_list          → review backlog (milestone=null)
3. taiga_userstories_update        → assign stories to sprint (set milestone)
4. taiga_userstories_bulk_update_sprint_order → set story priority within sprint
```

### Daily Standup Data

```
1. taiga_milestones_stats          → burndown progress
2. taiga_tasks_list                → filter by milestone, status!=closed
3. taiga_userstories_list          → filter by milestone for story status
```

### Sprint Closure

```
1. taiga_milestones_stats          → final burndown
2. taiga_userstories_list          → find incomplete stories
3. taiga_userstories_update        → move unfinished to backlog (milestone=null)
4. taiga_milestones_update         → set closed=true
```

## Kanban Workflow

### Board Setup

```
1. taiga_userstory_statuses_list   → review column statuses
2. taiga_userstory_statuses_create → add custom columns if needed
3. taiga_userstories_bulk_update_kanban_order → set card order
```

### Move Cards

```
1. taiga_userstories_update        → change status to move between columns
2. taiga_userstories_update        → assign/reassign team members
```

## Feature Development Flow

### Epic → Stories → Tasks

```
1. taiga_epics_create                        → create feature epic
2. taiga_userstories_bulk_create             → create stories under project
3. taiga_epics_related_userstories_bulk_create → link stories to epic
4. taiga_tasks_bulk_create                   → create tasks per story
5. taiga_userstories_update                  → assign to sprint
```

## Bug Resolution Flow

```
1. taiga_issues_create             → create with type=Bug, severity, priority
2. taiga_issue_comment_create      → add reproduction steps
3. taiga_issues_update             → assign to developer, status=In Progress
4. taiga_issues_update             → status=Ready for Test when fixed
5. taiga_issues_update             → status=Closed when verified
```

## Project Onboarding

### New Team Member

```
1. taiga_roles_list                → find appropriate role
2. taiga_memberships_create        → invite member with role
3. taiga_wiki_get_by_slug          → share onboarding docs (slug: getting-started)
```

### New Project from Template

```
1. taiga_project_export            → export existing template project
2. taiga_project_import            → import as new project
3. taiga_projects_update           → rename and customize
4. taiga_memberships_bulk_create   → invite team
```
