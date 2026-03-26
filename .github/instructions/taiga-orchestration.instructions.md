---
description: "Orchestration patterns for Taiga agent delegation. Use when: the Taiga Project Manager needs to route tasks to specialized sub-agents, coordinating multi-domain workflows, chaining sub-agent calls."
---

# Taiga Agent Orchestration

## Agent Architecture

The Taiga agent system follows a **hub-and-spoke** pattern:

- **Taiga Project Manager** — orchestrator that delegates to specialists
- **Specialist agents** — each owns a specific Taiga entity domain with restricted tools

```
                    ┌─────────────────────┐
                    │  Taiga Project Mgr  │
                    │   (orchestrator)    │
                    └────────┬────────────┘
                             │ delegates to
         ┌───────────┬──────┼──────┬────────────┐
         ▼           ▼      ▼      ▼            ▼
   ┌──────────┐ ┌────────┐ ┌──┐ ┌───────┐ ┌─────────┐
   │  Stories │ │ Tasks  │ │..│ │Sprints│ │ Project │
   │          │ │        │ │  │ │       │ │  Setup  │
   └──────────┘ └────────┘ └──┘ └───────┘ └─────────┘
```

## Agent → Tool Domain Mapping

| Agent                   | Primary Entity        | Key Tools                                                                     |
| ----------------------- | --------------------- | ----------------------------------------------------------------------------- |
| **Taiga User Stories**  | User stories          | `taiga_userstories_*`, `taiga_userstory_*`, `taiga_points_*`                  |
| **Taiga Tasks**         | Tasks                 | `taiga_tasks_*`, `taiga_task_*`                                               |
| **Taiga Issues**        | Issues                | `taiga_issues_*`, `taiga_issue_*`, `taiga_priorities_*`, `taiga_severities_*` |
| **Taiga Epics**         | Epics                 | `taiga_epics_*`, `taiga_epic_*`                                               |
| **Taiga Sprints**       | Milestones            | `taiga_milestones_*`                                                          |
| **Taiga Wiki**          | Wiki pages            | `taiga_wiki_*`                                                                |
| **Taiga Team**          | Members & roles       | `taiga_memberships_*`, `taiga_roles_*`, `taiga_users_*`                       |
| **Taiga Reporter**      | Analytics (read-only) | Stats, timeline, list/filter tools                                            |
| **Taiga Project Setup** | Project config        | `taiga_projects_*`, statuses, types, webhooks, export/import                  |

## Delegation Rules

1. **Single-domain tasks** → delegate to the one specialist agent
2. **Multi-domain tasks** → orchestrator chains multiple sub-agent calls in sequence
3. **Read-only analytics** → always use Taiga Reporter
4. **Project configuration** → always use Taiga Project Setup
5. **Resolver calls** → orchestrator resolves IDs before passing to sub-agents

## Multi-Domain Workflow Patterns

### Feature Development

```
Orchestrator
  ├─ 1. Taiga Epics         → create epic
  ├─ 2. Taiga User Stories   → create stories, link to epic
  ├─ 3. Taiga Tasks          → create tasks per story
  └─ 4. Taiga Sprints        → assign stories to sprint
```

### Sprint Planning

```
Orchestrator
  ├─ 1. Taiga Reporter       → get velocity data
  ├─ 2. Taiga Sprints        → create sprint
  └─ 3. Taiga User Stories   → assign/order stories in sprint
```

### Bug Lifecycle

```
Orchestrator
  ├─ 1. Taiga Issues         → create and classify bug
  ├─ 2. Taiga Tasks          → create fix tasks (optional)
  └─ 3. Taiga Issues         → track resolution
```

### Project Bootstrap

```
Orchestrator
  ├─ 1. Taiga Project Setup  → create project, configure workflows
  ├─ 2. Taiga Team           → invite members, assign roles
  ├─ 3. Taiga Wiki           → create onboarding documentation
  └─ 4. Taiga User Stories   → seed initial backlog
```

### Retrospective Report

```
Orchestrator
  ├─ 1. Taiga Reporter       → sprint stats, burndown, velocity
  └─ 2. Taiga Reporter       → team activity & member contributions
```

## Sub-Agent Chaining

Sub-agents can also delegate to other sub-agents when their task naturally crosses domains. For example:

- **Taiga User Stories** may invoke **Taiga Tasks** to create tasks for a story
- **Taiga Sprints** may invoke **Taiga User Stories** to list stories in a sprint

When chaining, the calling agent should pass resolved IDs (project_id, milestone_id) to avoid redundant resolver calls.
