---
name: issue-triage
description: "Triage, prioritize, and manage Taiga issues using MCP tools. Use when: creating issues, setting priority/severity/type, bulk creating issues, filtering issues by status, assigning issues, reviewing issue statistics, adding comments to issues."
argument-hint: "Describe the issue management task (e.g. 'create a critical bug for login failure')"
---

# Issue Triage

Create, classify, prioritize, and manage issues in Taiga for effective bug tracking and issue resolution.

## When to Use

- Creating new bugs, enhancements, or questions
- Setting or changing issue priority, severity, and type
- Bulk creating issues from a list
- Filtering and reviewing issues by status or assignment
- Adding comments or tracking issue history
- Reviewing project issue statistics

## Procedure

### 1. Understand Project Issue Configuration

Before creating issues, check available classifications:

```
taiga_issue_types_list       → Bug, Enhancement, Question, etc.
taiga_priorities_list        → Low, Normal, High, Critical, etc.
taiga_severities_list        → Wishlist, Minor, Normal, Important, Critical
taiga_issue_statuses_list    → New, In Progress, Ready for Test, Closed, etc.
```

### 2. Create Issues

Single issue with full classification:

```
taiga_issues_create          → project, subject, priority, severity, type, status, assigned_to, description, tags
```

Bulk create from a list:

```
taiga_issues_bulk_create     → project_id, bulk_issues (newline-separated subjects)
```

### 3. Triage and Classify

Update issue properties for proper classification:

```
taiga_issues_update          → change priority, severity, type, status, assigned_to
taiga_issues_get_by_ref      → look up issue by project + reference number
```

### 4. Filter and Review

Find issues matching criteria:

```
taiga_issues_list            → filter by project, status, severity, priority, type, assigned_to, tags, role
taiga_issues_filters_data    → get available filter options for a project
taiga_projects_issues_stats  → aggregate issue statistics
```

### 5. Track Progress

```
taiga_issue_history          → view change history
taiga_issue_comment_create   → add comments (via PATCH on issue version)
taiga_issue_comment_delete   → remove a comment
```

### 6. Community Engagement

```
taiga_issues_upvote          → vote for an issue
taiga_issues_downvote        → remove vote
taiga_issues_watch           → subscribe to notifications
```

## Tips

- Always check `taiga_priorities_list` and `taiga_severities_list` first — IDs vary per project
- Use `taiga_issues_filters_data` to discover valid filter values before querying
- Bulk create assigns default priority/severity/type — update individually after creation
- Use `taiga_projects_issues_stats` for a dashboard overview of issue distribution
