# Getting Started

## Prerequisites

- A running [Taiga](https://taiga.io) instance (self-hosted or cloud)
- A Taiga user account with API access
- An MCP-compatible client: VS Code with GitHub Copilot, Claude Desktop, or any MCP client

## Installation

### Option 1: npx (recommended)

No installation required. Add the server to your MCP client configuration:

**VS Code / GitHub Copilot** — add to `.vscode/mcp.json` or user `mcp.json`:

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

**Claude Desktop** — add to `claude_desktop_config.json`:

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

### Option 2: Docker

```bash
git clone https://github.com/illodev/taiga-mcp.git
cd taiga-mcp
cp .env.example .env
# Edit .env with your credentials
docker compose up --build
```

### Option 3: Local development

```bash
git clone https://github.com/illodev/taiga-mcp.git
cd taiga-mcp
pnpm install
pnpm run dev
```

## Environment Variables

| Variable         | Required | Description                                                |
| ---------------- | -------- | ---------------------------------------------------------- |
| `TAIGA_URL`      | Yes      | Taiga instance base URL (e.g. `https://taiga.example.com`) |
| `TAIGA_USERNAME` | Yes      | Your Taiga username                                        |
| `TAIGA_PASSWORD` | Yes      | Your Taiga password                                        |

## Verify It Works

Once configured, test the connection by asking your AI agent:

```
List my Taiga projects
```

The agent should call `taiga_projects_list` and return your projects. If you see an error, check:

1. The `TAIGA_URL` is correct and reachable
2. The credentials are valid
3. The MCP server is properly configured in your client

## First Steps

### 1. Find your project

Every operation in Taiga needs a **project ID**. You can find it by slug:

```
What's the ID for my project "my-project-slug"?
```

The agent uses `taiga_resolver_project` to convert the slug to a numeric ID.

### 2. Explore the project

```
Show me the stats for project my-project-slug
```

### 3. Try an agent

Invoke a specialized agent for focused work:

```
@Taiga User Stories Create a user story "As a user, I want to log in with SSO" in project my-project-slug
```

```
@Taiga Issues Create a critical bug "Login page crashes on Safari" in project my-project-slug
```

```
@Taiga Reporter Generate a sprint burndown report for project my-project-slug
```

## Next Steps

- [Agent Architecture](agent-architecture.md) — understand how agents delegate work
- [Usage Examples](examples.md) — detailed examples for every domain
- [Advanced Workflows](advanced-workflows.md) — multi-step, cross-domain recipes
