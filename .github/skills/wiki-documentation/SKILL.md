---
name: wiki-documentation
description: "Manage Taiga wiki pages and documentation using MCP tools. Use when: creating wiki pages, updating documentation, managing wiki links and navigation, tracking wiki changes, organizing project documentation."
argument-hint: "Describe the wiki task (e.g. 'create an API documentation wiki page')"
---

# Wiki Documentation

Create and manage project documentation through Taiga's wiki system.

## When to Use

- Creating new wiki pages for project documentation
- Updating existing documentation content
- Setting up wiki navigation links
- Reviewing documentation history and changes
- Organizing project knowledge base

## Procedure

### 1. Review Existing Documentation

```
taiga_wiki_list              → list all wiki pages for the project
taiga_wiki_links_list        → list navigation links
taiga_wiki_get_by_slug       → get specific page by slug and project
```

### 2. Create Wiki Pages

```
taiga_wiki_create            → project, slug, content (Markdown)
```

- `slug`: URL-friendly identifier (e.g., `api-documentation`, `getting-started`)
- `content`: Full Markdown content for the page

### 3. Update Content

```
taiga_wiki_update            → update content, slug, or version
taiga_wiki_get               → get current content before updating
```

### 4. Organize Navigation

Create a navigation structure with wiki links:

```
taiga_wiki_links_create      → project, title, href (wiki slug), order
taiga_wiki_links_update      → change title, href, or order
taiga_wiki_links_delete      → remove a navigation link
taiga_wiki_links_list        → review current navigation
```

### 5. Track Changes

```
taiga_wiki_history           → view edit history for a wiki page
taiga_wiki_comment_create    → add discussion comment to a page
taiga_wiki_comment_delete    → remove a comment
```

### 6. Manage Attachments and Subscriptions

```
taiga_wiki_attachments_list  → list files attached to a wiki page
taiga_wiki_watch             → subscribe to page notifications
taiga_wiki_unwatch           → unsubscribe from notifications
taiga_wiki_watchers          → list current subscribers
```

## Common Documentation Structure

Suggested pages for a project wiki:

| Slug                | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `home`              | Project overview and quick links           |
| `getting-started`   | Onboarding guide for new team members      |
| `architecture`      | System architecture and decisions          |
| `api-documentation` | API endpoints and usage                    |
| `development-guide` | Local setup, coding standards              |
| `deployment`        | Deployment procedures and environments     |
| `runbooks`          | Operational procedures and troubleshooting |

## Tips

- Wiki content supports full Markdown syntax
- Use `slug` as a stable URL identifier — choose descriptive, hyphenated names
- Set up `wiki_links` to create a sidebar navigation for easy page discovery
- Use `order` field on wiki links to control navigation ordering
- Track documentation freshness with `taiga_wiki_history`
