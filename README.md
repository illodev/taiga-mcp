# Taiga MCP Server

Full-featured MCP (Model Context Protocol) server for [Taiga](https://taiga.io) project management.

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

## MCP Client Configuration

Add to your MCP client config (e.g. Claude Desktop):

```json
{
  "mcpServers": {
    "taiga": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/path/to/taiga-mcp",
      "env": {
        "TAIGA_URL": "https://taiga.example.com",
        "TAIGA_USERNAME": "your-user",
        "TAIGA_PASSWORD": "your-pass"
      }
    }
  }
}
```

Or with Docker:

```json
{
  "mcpServers": {
    "taiga": {
      "command": "docker",
      "args": ["compose", "run", "--rm", "-i", "taiga-mcp"],
      "cwd": "/path/to/taiga-mcp",
      "env": {
        "TAIGA_URL": "https://taiga.example.com",
        "TAIGA_USERNAME": "your-user",
        "TAIGA_PASSWORD": "your-pass"
      }
    }
  }
}
```
