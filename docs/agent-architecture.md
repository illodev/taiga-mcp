# Agent Architecture

The Taiga MCP server exposes **~170 tools** covering all of Taiga's API. To avoid overwhelming any single AI agent, the system uses a **hub-and-spoke architecture** where a central orchestrator delegates to specialized agents.

## Overview

```
                         User Request
                              │
                              ▼
                   ┌─────────────────────┐
                   │  Taiga Project Mgr  │
                   │   (orchestrator)    │
                   │                     │
                   │  Tools: resolver,   │
                   │  search, project    │
                   │  lookup (~12 tools) │
                   └────────┬────────────┘
                            │ delegates to
        ┌──────────┬────────┼────────┬──────────┐
        ▼          ▼        ▼        ▼          ▼
  ┌──────────┐ ┌───────┐ ┌──────┐ ┌───────┐ ┌─────────┐
  │ Stories  │ │ Tasks │ │Issues│ │Sprints│ │  Setup  │
  │ ~42 tools│ │~33    │ │~49   │ │~11    │ │ ~65     │
  └──────────┘ └───────┘ └──────┘ └───────┘ └─────────┘
        ┌──────────┐ ┌───────┐ ┌──────┐ ┌──────────┐
        │  Epics   │ │ Wiki  │ │ Team │ │ Reporter │
        │  ~29     │ │ ~20   │ │ ~20  │ │ ~22 (RO) │
        └──────────┘ └───────┘ └──────┘ └──────────┘
```

## Agents

### Taiga Project Manager (Orchestrator)

**Role**: Entry point for complex, cross-domain requests. Resolves project context and delegates to specialists.

**Tools**: Only resolver, search, and project lookup tools (~12). Cannot directly create/update/delete entities.

**When to use**: Multi-domain tasks like "set up a new sprint with stories and assign the team" or "create a feature from epic to tasks".

**Invoke**: `@Taiga Project Manager`

---

### Taiga User Stories

**Role**: Full CRUD on user stories, including backlog/kanban/sprint ordering, story points, comments, custom attributes, and attachments.

**Tools**: `taiga_userstories_*`, `taiga_userstory_*`, `taiga_points_*`, resolvers (~42 tools)

**When to use**: Creating stories, ordering the backlog, setting story points, managing story comments.

**Invoke**: `@Taiga User Stories`

**Example**:

```
@Taiga User Stories Create 5 user stories for the authentication feature in project my-app
```

---

### Taiga Tasks

**Role**: Full CRUD on tasks, including statuses, comments, custom attributes, and bulk operations.

**Tools**: `taiga_tasks_*`, `taiga_task_*`, resolvers (~33 tools)

**When to use**: Creating tasks for a user story, updating task progress, managing task comments.

**Invoke**: `@Taiga Tasks`

**Example**:

```
@Taiga Tasks Create tasks "Design DB schema", "Implement API", "Write tests" for story #42 in project my-app
```

---

### Taiga Issues

**Role**: Full CRUD on issues, including priorities, severities, issue types, comments, custom attributes.

**Tools**: `taiga_issues_*`, `taiga_issue_*`, `taiga_priorities_*`, `taiga_severities_*`, resolvers (~49 tools)

**When to use**: Reporting bugs, classifying issues, triaging by priority/severity.

**Invoke**: `@Taiga Issues`

**Example**:

```
@Taiga Issues Create a critical bug "Payment gateway timeout on checkout" with severity=Critical in project my-shop
```

---

### Taiga Epics

**Role**: Full CRUD on epics, including linking/unlinking user stories, custom attributes, bulk operations.

**Tools**: `taiga_epics_*`, `taiga_epic_*`, resolvers (~29 tools)

**When to use**: Creating feature epics, linking stories to epics, reviewing epic progress.

**Invoke**: `@Taiga Epics`

**Example**:

```
@Taiga Epics Create an epic "User Authentication" and link stories #10, #11, #12 in project my-app
```

---

### Taiga Sprints

**Role**: Full CRUD on milestones/sprints, including burndown stats and sprint lifecycle.

**Tools**: `taiga_milestones_*`, resolvers (~11 tools)

**When to use**: Creating sprints, checking burndown, closing sprints.

**Invoke**: `@Taiga Sprints`

**Example**:

```
@Taiga Sprints Create a 2-week sprint "Sprint 5" starting 2026-03-30 in project my-app
```

---

### Taiga Wiki

**Role**: Full CRUD on wiki pages, navigation links, comments, history, and attachments.

**Tools**: `taiga_wiki_*`, resolvers (~20 tools)

**When to use**: Creating documentation pages, managing wiki navigation, reviewing page history.

**Invoke**: `@Taiga Wiki`

**Example**:

```
@Taiga Wiki Create a wiki page "api-reference" with the API documentation for project my-app
```

---

### Taiga Team

**Role**: Manage project memberships, roles, permissions, and user profiles.

**Tools**: `taiga_memberships_*`, `taiga_roles_*`, `taiga_users_*`, resolvers (~20 tools)

**When to use**: Inviting members, assigning roles, managing permissions, reviewing team composition.

**Invoke**: `@Taiga Team`

**Example**:

```
@Taiga Team Invite alice@company.com and bob@company.com as Developers in project my-app
```

---

### Taiga Reporter

**Role**: Read-only analytics and reporting across all entities.

**Tools**: Stats, timeline, list, and filter tools (~22 tools). **No write tools.**

**When to use**: Generating reports, sprint burndown analysis, team activity summaries.

**Invoke**: `@Taiga Reporter`

**Example**:

```
@Taiga Reporter Generate a project health dashboard for my-app
```

---

### Taiga Project Setup

**Role**: Project configuration — statuses, workflows, types, priorities, severities, points, tags, webhooks, export/import.

**Tools**: `taiga_projects_*`, all status/type/priority/severity tools, webhooks, export/import (~65 tools)

**When to use**: Creating new projects, configuring workflows, setting up webhooks.

**Invoke**: `@Taiga Project Setup`

**Example**:

```
@Taiga Project Setup Create a new Scrum project "Mobile App" with custom statuses: Design, Development, Code Review, QA, Done
```

## Delegation Flow

When the orchestrator receives a request, it follows this flow:

```
1. Resolve project context (slug → ID)
2. Analyze request → identify domains involved
3. For each domain:
   a. Invoke the specialist sub-agent
   b. Pass resolved IDs (project_id, etc.)
   c. Collect results
4. Summarize all actions to the user
```

### Single-Domain Example

```
User: "Create a bug for the login crash"

Orchestrator:
  1. Resolves project ID
  2. Identifies domain: Issues
  3. Delegates to Taiga Issues → creates the bug
  4. Returns bug reference to user
```

### Multi-Domain Example

```
User: "Create a feature epic for SSO, add 3 user stories, and plan them in the next sprint"

Orchestrator:
  1. Resolves project ID
  2. Identifies domains: Epics + User Stories + Sprints
  3. Delegates to Taiga Epics → creates the epic
  4. Delegates to Taiga User Stories → creates 3 stories, links to epic
  5. Delegates to Taiga Sprints → assigns stories to next sprint
  6. Returns summary with all created entity IDs
```

## Sub-Agent Chaining

Sub-agents can invoke other sub-agents when their task naturally crosses domains:

- **Taiga User Stories** → may invoke **Taiga Tasks** to create tasks for a story
- **Taiga Sprints** → may invoke **Taiga User Stories** to list/assign stories

This enables recursive delegation without requiring everything to flow through the orchestrator.
