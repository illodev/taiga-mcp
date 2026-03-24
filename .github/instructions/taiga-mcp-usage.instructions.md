---
description: "General guidelines for working with Taiga MCP tools. Use when: interacting with any Taiga MCP tool, resolving project identifiers, handling Taiga API patterns, understanding tool naming conventions."
---

# Taiga MCP Usage Guidelines

## Tool Naming Convention

All tools follow the pattern `taiga_{module}_{action}`. Modules map to Taiga entities:

| Module        | Entity              |
| ------------- | ------------------- |
| `projects`    | Projects            |
| `epics`       | Epics               |
| `userstories` | User Stories        |
| `tasks`       | Tasks               |
| `issues`      | Issues              |
| `milestones`  | Sprints/Milestones  |
| `wiki`        | Wiki Pages          |
| `memberships` | Team Members        |
| `roles`       | Roles & Permissions |
| `users`       | Users               |
| `search`      | Global Search       |
| `timeline`    | Activity Feeds      |
| `resolver`    | Slug/Ref → ID       |
| `webhooks`    | Webhooks            |

## ID Resolution Pattern

Most tools require numeric IDs. Always resolve identifiers first:

1. **Project**: Use `taiga_resolver_project` with slug, or `taiga_projects_get_by_slug`
2. **Stories/Tasks/Issues**: Use `taiga_{entity}_get_by_ref` with project ID + reference number
3. **Milestones**: Use `taiga_resolver_milestone` with project slug + milestone slug
4. **Wiki**: Use `taiga_resolver_wiki` or `taiga_wiki_get_by_slug` with project ID + slug

## Common Patterns

- **List → Filter → Act**: Always list available options before creating or updating
- **Check config first**: Before creating issues, check types/priorities/severities for the project
- **Bulk operations**: Use `_bulk_create` for batch creation, `_bulk_update_*_order` for reordering
- **Voting/Watching**: Available on epics, stories, tasks, and issues via `_upvote`/`_watch`

## Error Handling

- If a tool returns an error about missing fields, check required parameters in the tool description
- Version conflicts on updates mean the entity was modified — re-fetch and retry
- 404 errors usually mean the ID is wrong — use resolver tools to re-validate
