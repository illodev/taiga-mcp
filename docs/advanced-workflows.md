# Advanced Workflows

End-to-end, multi-domain workflow recipes that show how agents collaborate through the orchestrator. These workflows demonstrate the **hub-and-spoke delegation** in action.

---

## 1. Feature Development (Epic → Stories → Tasks → Sprint)

**Scenario**: You need to plan a complete feature from scratch — create an epic, break it into stories with tasks, and schedule them into a sprint.

### Prompt

```
@Taiga Project Manager Plan the "Social Login" feature for project my-app:

1. Create an epic "Social Login Integration"
2. Create these user stories:
   - "As a user, I want to log in with Google"
   - "As a user, I want to log in with GitHub"
   - "As a user, I want to link social accounts to my profile"
3. For each story, create tasks: "Backend API", "Frontend UI", "Tests"
4. Assign all stories to sprint "Sprint 7"
```

### Delegation Flow

```
Orchestrator
 ├─ taiga_resolver_project → ID 42
 │
 ├─ @Taiga Epics
 │   └─ taiga_epics_create → Epic "Social Login Integration" (ID 15)
 │
 ├─ @Taiga User Stories
 │   ├─ taiga_userstories_bulk_create → 3 stories (IDs 101, 102, 103)
 │   └─ taiga_epics_related_userstories_bulk_create → links stories to epic
 │
 ├─ @Taiga Tasks
 │   └─ taiga_tasks_bulk_create × 3 → 9 tasks (3 per story)
 │
 └─ @Taiga Sprints
     ├─ taiga_resolver_milestone → Sprint 7 ID
     └─ taiga_userstories_update × 3 → assigns stories to sprint
```

### Result

The orchestrator returns a summary:
- Epic #15 "Social Login Integration" created
- 3 user stories created and linked to epic
- 9 tasks created (3 per story)
- All stories assigned to Sprint 7

---

## 2. Sprint Planning Session

**Scenario**: Start of a new sprint — create the sprint, move stories from backlog, and set up the sprint board.

### Prompt

```
@Taiga Project Manager Set up Sprint 8 for project my-app:

1. Create sprint "Sprint 8" from April 28 to May 12
2. Move the top 5 backlog stories into this sprint
3. Show me the burndown baseline
```

### Delegation Flow

```
Orchestrator
 ├─ taiga_resolver_project → ID 42
 │
 ├─ @Taiga Sprints
 │   └─ taiga_milestones_create → Sprint 8 (ID 20)
 │
 ├─ @Taiga User Stories
 │   ├─ taiga_userstories_list → backlog stories (milestone=null, ordered)
 │   └─ taiga_userstories_update × 5 → set milestone=20
 │
 └─ @Taiga Reporter
     └─ taiga_milestones_stats → burndown baseline data
```

---

## 3. Bug Lifecycle (Triage → Fix → Verify → Close)

**Scenario**: A critical bug is reported and needs to go through the full lifecycle with team coordination.

### Step 1: Report the bug

```
@Taiga Issues Create a critical bug in project my-app:
  Title: "Payment processing fails for amounts > $1000"
  Severity: Critical
  Priority: Urgent
  Description: "Transactions over $1000 return a 500 error from the payment gateway..."
```

### Step 2: Assign and start work

```
@Taiga Issues On issue #78 in my-app:
  - Assign to alice
  - Change status to "In Progress"
  - Add comment "Alice is investigating the payment gateway integration"
```

### Step 3: Resolve and verify

```
@Taiga Issues On issue #78 in my-app:
  - Change status to "Ready for Test"
  - Add comment "Fixed: integer overflow on amount validation. PR #234 merged."
```

### Step 4: Close

```
@Taiga Issues On issue #78 in my-app:
  - Change status to "Closed"
  - Add comment "Verified in staging. Amounts up to $999,999 work correctly."
```

---

## 4. Project Bootstrap

**Scenario**: Set up a brand new project with everything needed to start working.

### Prompt

```
@Taiga Project Manager Bootstrap a new project for our team:

1. Create a Scrum project called "Platform v2"
2. Set up custom statuses: New → Design → Development → Code Review → QA → Done
3. Create roles: Tech Lead, Backend Dev, Frontend Dev, QA Engineer, Product Owner
4. Invite the team:
   - alice@co.com as Tech Lead
   - bob@co.com as Backend Dev
   - carol@co.com as Frontend Dev
   - dave@co.com as QA Engineer
5. Create a wiki page "Getting Started" with onboarding instructions
6. Create the first sprint "Sprint 1" from today for 2 weeks
```

### Delegation Flow

```
Orchestrator
 │
 ├─ @Taiga Project Setup
 │   ├─ taiga_projects_create → project "Platform v2" (ID 50)
 │   ├─ taiga_userstory_statuses_create × 4 → custom statuses
 │   ├─ taiga_userstory_statuses_bulk_update_order → ordering
 │   └─ taiga_roles_create × 5 → custom roles
 │
 ├─ @Taiga Team
 │   └─ taiga_memberships_bulk_create → invites all 4 members
 │
 ├─ @Taiga Wiki
 │   └─ taiga_wiki_create → "Getting Started" page
 │
 └─ @Taiga Sprints
     └─ taiga_milestones_create → Sprint 1
```

---

## 5. Sprint Retrospective

**Scenario**: End of sprint — gather metrics, close the sprint, and prepare the next one.

### Prompt

```
@Taiga Project Manager Run the Sprint 7 retrospective for project my-app:

1. Show final burndown and velocity
2. List all completed stories and their points
3. Move unfinished stories to backlog
4. Close Sprint 7
5. Create Sprint 8 for the next 2 weeks
```

### Delegation Flow

```
Orchestrator
 │
 ├─ @Taiga Reporter
 │   ├─ taiga_milestones_stats → burndown + velocity
 │   └─ taiga_userstories_list → stories in Sprint 7 (completed vs incomplete)
 │
 ├─ @Taiga User Stories
 │   └─ taiga_userstories_update × N → move incomplete to backlog (milestone=null)
 │
 ├─ @Taiga Sprints
 │   ├─ taiga_milestones_update → close Sprint 7 (closed=true)
 │   └─ taiga_milestones_create → create Sprint 8
 │
 └─ Orchestrator summarizes:
     - Completed: 12 stories, 47 points
     - Carried over: 3 stories, 13 points
     - Velocity: 47 points (Sprint 7), avg 42 over last 3 sprints
```

---

## 6. Weekly Status Report

**Scenario**: Generate a comprehensive status report for stakeholders.

### Prompt

```
@Taiga Reporter Generate a weekly status report for project my-app including:
  - Sprint progress (burndown)
  - Completed work this week
  - Open blockers (critical issues)
  - Team activity summary
```

### Tools Called

```
Reporter (single agent, no delegation needed)
 ├─ taiga_resolver_project → ID
 ├─ taiga_milestones_list → current sprint
 ├─ taiga_milestones_stats → burndown data
 ├─ taiga_timeline_project → recent activity
 ├─ taiga_issues_list → filter critical open issues
 ├─ taiga_projects_stats → overall stats
 └─ taiga_projects_member_stats → per-member activity
```

### Output Format

The Reporter agent generates a structured Markdown report:

```markdown
# Weekly Status Report — my-app
**Sprint 7** (Apr 14 – Apr 28) | Day 8 of 14

## Sprint Progress
- Completed: 8/15 stories (53%)
- Points burned: 31/60 (52%)
- On track: ✅ Yes

## Completed This Week
- ✅ Story #45: User profile page
- ✅ Story #46: Email notifications
- ✅ Story #47: Password reset flow

## Open Blockers
- 🔴 Issue #78: Payment gateway timeout (Critical, assigned to alice)

## Team Activity
- alice: 12 actions (3 stories completed)
- bob: 8 actions (2 stories in progress)
- carol: 15 actions (4 tasks completed)
```

---

## 7. Epic Progress Review

**Scenario**: Review the overall progress of a feature epic across all its stories.

### Prompt

```
@Taiga Project Manager Show me the full progress of the "User Authentication" epic in project my-app
```

### Delegation Flow

```
Orchestrator
 ├─ taiga_resolver_project → ID
 │
 ├─ @Taiga Epics
 │   ├─ taiga_epics_get_by_ref → epic details
 │   └─ taiga_epics_related_userstories_list → all linked stories
 │
 └─ @Taiga Reporter
     └─ Summarizes story statuses, points, completion %
```

---

## Tips for Complex Workflows

1. **Always start with the project slug** — the orchestrator resolves it once and passes the ID to all sub-agents.

2. **Order matters for dependencies** — create epics before stories, stories before tasks, sprints before assigning stories to them.

3. **Use the orchestrator for cross-domain work** — don't try to do everything in a single specialist agent. The orchestrator coordinates multiple agents efficiently.

4. **Use the Reporter for read-only queries** — it has optimized access to all stats and list tools without write permissions, making it safe for dashboards and reports.

5. **Batch operations when possible** — use `_bulk_create` and `_bulk_update_*_order` tools for efficiency instead of creating/updating one entity at a time.
