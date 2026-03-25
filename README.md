# Taiga MCP Server

[![npm version](https://img.shields.io/npm/v/@illodev/taiga-mcp)](https://www.npmjs.com/package/@illodev/taiga-mcp)
[![npm downloads](https://img.shields.io/npm/dm/@illodev/taiga-mcp)](https://www.npmjs.com/package/@illodev/taiga-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Full-featured MCP (Model Context Protocol) server for [Taiga](https://taiga.io) project management. Provides comprehensive access to Taiga's API v1, enabling AI agents to manage projects, epics, user stories, tasks, issues, sprints, wiki pages, memberships, roles, and more.

## Features

Covers **all** Taiga API v1 endpoints:

- **Projects** — CRUD, stats, tags, likes, watching
- **Epics** — CRUD, bulk create, related user stories, voting, watching, attachments
- **User Stories** — CRUD, bulk operations, ordering, voting, watching, attachments
- **Tasks** — CRUD, bulk create, voting, watching, attachments
- **Issues** — CRUD, bulk create, voting, watching, attachments
- **Milestones/Sprints** — CRUD, stats, watching
- **Wiki** — Pages & links CRUD, watching, attachments
- **Memberships** — CRUD, bulk invite
- **Roles** — CRUD with permissions
- **Users** — List, get, me, stats, contacts
- **Statuses** — US/Task/Issue statuses, types, priorities, severities, points
- **Custom Attributes** — Definitions & values for epics, user stories, tasks, issues
- **History & Comments** — Change history, create/delete comments
- **Search** — Global project search
- **Timeline** — User & project timeline
- **Resolver** — Slug/ref to ID resolution
- **Webhooks** — CRUD, test, logs
- **Export/Import** — Project export & import

## Setup

### Environment Variables

| Variable         | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `TAIGA_URL`      | Taiga instance URL (e.g. `https://taiga.example.com`) |
| `TAIGA_USERNAME` | Taiga username                                        |
| `TAIGA_PASSWORD` | Taiga password                                        |

### MCP Client Configuration (recommended)

The easiest way to use this server is via `npx` — no installation required:

```json
{
  "mcpServers": {
    "taiga": {
      "command": "npx",
      "args": ["-y", "@illodev/taiga-mcp"],
      "env": {
        "TAIGA_URL": "https://taiga.example.com",
        "TAIGA_USERNAME": "your-user",
        "TAIGA_PASSWORD": "your-pass"
      }
    }
  }
}
```

> **VS Code / GitHub Copilot** — add the entry above to your `mcp.json`.  
> **Claude Desktop** — add it under `mcpServers` in `claude_desktop_config.json`.

### Docker Compose

```bash
cp .env.example .env
# Edit .env with your Taiga credentials
docker compose up --build
```

### Local Development

```bash
pnpm install
pnpm run dev
```

### Build

```bash
pnpm run build
pnpm start
```

## Agent Customizations

This project includes ready-to-use GitHub Copilot customizations under `.github/` so your AI agents can work effectively with the Taiga MCP tools.

```
.github/
├── agents/                              # Custom agents
│   ├── taiga-project-manager.agent.md   # Orchestrator — delegates to sub-agents
│   ├── taiga-scrum-master.agent.md      # Sprint planning & backlog management
│   ├── taiga-issue-tracker.agent.md     # Bug triage & issue classification
│   └── taiga-reporter.agent.md          # Project reports & analytics
├── instructions/                        # Context-aware guidelines
│   ├── taiga-mcp-usage.instructions.md  # Tool naming, ID resolution, common patterns
│   └── taiga-workflows.instructions.md  # Scrum/Kanban recipes, feature flows
└── skills/                              # On-demand workflow skills
    ├── sprint-planning/SKILL.md         # Create & manage sprints
    ├── backlog-grooming/SKILL.md        # Refine stories, epics, and points
    ├── issue-triage/SKILL.md            # Classify and prioritize issues
    ├── project-setup/SKILL.md           # Configure a new project from scratch
    ├── project-reporting/SKILL.md       # Generate stats and reports
    ├── team-management/SKILL.md         # Manage members, roles, permissions
    └── wiki-documentation/SKILL.md      # Create and organize wiki pages
```

### Custom Agents

| Agent                     | Role                                                                       | Invoke                   |
| ------------------------- | -------------------------------------------------------------------------- | ------------------------ |
| **Taiga Project Manager** | Orchestrates all project management tasks, delegates to specialized agents | `@Taiga Project Manager` |
| **Taiga Scrum Master**    | Sprint planning, backlog grooming, velocity tracking                       | `@Taiga Scrum Master`    |
| **Taiga Issue Tracker**   | Bug triage, issue classification, severity/priority management             | `@Taiga Issue Tracker`   |
| **Taiga Reporter**        | Project reports, burndown analysis, team activity summaries                | `@Taiga Reporter`        |

### Skills (slash commands)

| Skill                 | Description                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| `/sprint-planning`    | Plan sprints, assign stories, track burndown                           |
| `/backlog-grooming`   | Create epics, refine stories, set points, order backlog                |
| `/issue-triage`       | Create and classify issues with priority/severity                      |
| `/project-setup`      | Set up a new project with statuses, roles, tags, and custom attributes |
| `/project-reporting`  | Generate sprint, project, and team reports                             |
| `/team-management`    | Invite members, assign roles, manage permissions                       |
| `/wiki-documentation` | Create and organize wiki pages and navigation                          |

### Instructions

Loaded automatically when relevant:

- **taiga-mcp-usage** — Tool naming conventions, ID resolution patterns, error handling
- **taiga-workflows** — Ready-made recipes for Scrum sprints, Kanban boards, feature development, bug resolution
