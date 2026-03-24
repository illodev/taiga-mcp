---
name: project-reporting
description: "Generate Taiga project reports and statistics using MCP tools. Use when: reviewing project stats, sprint burndown, issue distribution, member contributions, timeline activity, exporting project data, creating status reports."
argument-hint: "Describe the report needed (e.g. 'sprint burndown for current milestone')"
---

# Project Reporting

Generate reports, statistics, and insights from Taiga project data.

## When to Use

- Creating project status reports
- Reviewing sprint burndown charts
- Analyzing issue distribution
- Tracking member contributions
- Reviewing project timeline and activity
- Exporting project data for external reporting

## Procedure

### 1. Project Overview

```
taiga_projects_get           → project details, modules enabled
taiga_projects_stats         → total milestones, user stories (by status), assigned points
```

### 2. Sprint / Milestone Report

```
taiga_milestones_list        → list all sprints (filter closed: true/false)
taiga_milestones_stats       → burndown data: total_points, completed_points, days breakdown
taiga_milestones_get         → full sprint details with closed points breakdown
```

Key metrics from `milestones_stats`:

- `total_points` — planned capacity
- `completed_points` — delivered points
- `days` — day-by-day burndown data

### 3. Issue Statistics

```
taiga_projects_issues_stats  → issues by severity, priority, status, type
taiga_issues_list            → detailed issue list with filters
taiga_issues_filters_data    → available filter values for querying
```

### 4. Team Activity

```
taiga_projects_member_stats  → contribution per member
taiga_users_stats            → individual user statistics
taiga_timeline_project       → recent project activity feed
taiga_timeline_user          → individual user activity
```

### 5. Backlog Health

```
taiga_userstories_list       → all stories with status breakdown
taiga_userstories_filters_data → filter options for analysis
taiga_epics_list             → epic progress overview
```

### 6. Export Full Project Data

```
taiga_project_export         → complete JSON dump of all project data
```

## Report Templates

### Sprint Status Report

1. Run `taiga_milestones_stats` for the current sprint
2. Run `taiga_tasks_list` filtered by milestone to get task breakdown
3. Run `taiga_userstories_list` filtered by milestone for story status
4. Summarize: planned vs delivered points, blocked items, remaining work

### Weekly Project Report

1. `taiga_projects_stats` for overall health
2. `taiga_projects_issues_stats` for issue trends
3. `taiga_timeline_project` for recent activity
4. `taiga_projects_member_stats` for team distribution

## Tips

- `taiga_milestones_stats` provides day-by-day burndown — ideal for tracking velocity
- Combine `projects_stats` + `issues_stats` + `member_stats` for a complete dashboard
- Use `taiga_timeline_project` with pagination for historical activity analysis
- Export via `taiga_project_export` for custom report generation in external tools
