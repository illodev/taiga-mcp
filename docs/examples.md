# Usage Examples

Practical examples for every agent domain. Each section shows conversational prompts and the tools that get called under the hood.

> **Note**: Replace `my-project` with your actual project slug. All examples use `@Agent` syntax for VS Code Copilot. In Claude Desktop or other MCP clients, the tools are called directly.

---

## User Stories

### Create a single story

```
@Taiga User Stories Create a user story in project my-project:
  "As a customer, I want to receive email notifications when my order ships"
```

**Tools called**:

1. `taiga_resolver_project` → resolves `my-project` to ID
2. `taiga_userstories_create` → creates the story

### Create stories in bulk

```
@Taiga User Stories Create these user stories in project my-project:
  1. "As a user, I want to reset my password via email"
  2. "As a user, I want to enable 2FA"
  3. "As a user, I want to log in with Google SSO"
  4. "As an admin, I want to manage user permissions"
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_userstories_bulk_create` → creates all 4 stories

### Order the backlog

```
@Taiga User Stories Reorder the backlog for project my-project. Put story #15 first, then #12, then #8.
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_userstories_get_by_ref` × 3 → resolves story IDs
3. `taiga_userstories_bulk_update_backlog_order` → sets the order

### Set story points

```
@Taiga User Stories Set 8 story points (UX role) on story #23 in project my-project
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_userstories_get_by_ref` → gets story ID
3. `taiga_points_list` → finds the point scale
4. `taiga_userstories_update` → sets the points

### Comment on a story

```
@Taiga User Stories Add a comment to story #23 in project my-project:
  "Discussed with the team — we'll use OAuth2 PKCE flow"
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_userstory_comment_create` → adds the comment

---

## Tasks

### Create tasks for a story

```
@Taiga Tasks Create the following tasks for story #23 in project my-project:
  - Design the database schema
  - Implement the REST API endpoints
  - Write unit tests
  - Update API documentation
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_userstories_get_by_ref` → gets story ID (for user_story field)
3. `taiga_tasks_bulk_create` → creates all 4 tasks

### Update task status

```
@Taiga Tasks Mark task #45 as "In Progress" and assign it to user john in project my-project
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_tasks_get_by_ref` → gets task ID and version
3. `taiga_task_statuses_list` → finds "In Progress" status ID
4. `taiga_users_list` → finds john's user ID
5. `taiga_tasks_update` → updates status and assigned_to

### List open tasks in a sprint

```
@Taiga Tasks List all open tasks in sprint "Sprint 5" of project my-project
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_resolver_milestone` → resolves sprint slug to ID
3. `taiga_tasks_list` → filters by milestone, excludes closed statuses

---

## Issues

### Create a bug report

```
@Taiga Issues Create a bug in project my-project:
  Title: "Login page crashes on Safari 17"
  Type: Bug
  Severity: Critical
  Priority: High
  Description: "When clicking 'Sign In' on Safari 17, the page shows a blank white screen.
  Steps: 1. Open login page in Safari 17  2. Enter credentials  3. Click Sign In"
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_issue_types_list` → finds "Bug" type ID
3. `taiga_severities_list` → finds "Critical" severity ID
4. `taiga_priorities_list` → finds "High" priority ID
5. `taiga_issues_create` → creates the issue

### Triage issues by severity

```
@Taiga Issues List all critical and high severity open issues in project my-project
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_severities_list` → gets severity IDs
3. `taiga_issues_list` → filters by severity and open status

### Track issue lifecycle with comments

```
@Taiga Issues On issue #78 in project my-project:
  1. Change status to "In Progress"
  2. Assign to developer alice
  3. Add comment "Root cause identified: missing null check in auth middleware"
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_issues_get_by_ref` → gets issue ID
3. `taiga_issue_statuses_list` → finds status ID
4. `taiga_issues_update` → updates status and assignee
5. `taiga_issue_comment_create` → adds the comment

---

## Epics

### Create an epic and link stories

```
@Taiga Epics In project my-project:
  1. Create an epic "User Authentication System"
  2. Link existing stories #10, #11, #12 to it
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_epics_create` → creates the epic
3. `taiga_userstories_get_by_ref` × 3 → resolves story IDs
4. `taiga_epics_related_userstories_bulk_create` → links all stories

### List stories under an epic

```
@Taiga Epics Show all user stories linked to epic #3 in project my-project
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_resolver_epic` → resolves epic ID
3. `taiga_epics_related_userstories_list` → returns linked stories

---

## Sprints

### Create a sprint

```
@Taiga Sprints Create sprint "Sprint 6" in project my-project:
  Start: 2026-04-14
  End: 2026-04-28
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_milestones_create` → creates the milestone

### Check sprint progress

```
@Taiga Sprints Show the burndown stats for the current sprint in project my-project
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_milestones_list` → finds the current open sprint
3. `taiga_milestones_stats` → returns burndown data

### Close a sprint

```
@Taiga Sprints Close sprint "Sprint 5" in project my-project
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_resolver_milestone` → gets milestone ID
3. `taiga_milestones_update` → sets `closed: true`

---

## Wiki

### Create a documentation page

```
@Taiga Wiki Create a wiki page in project my-project:
  Slug: "api-reference"
  Content: |
    # API Reference

    ## Authentication
    POST /api/auth/login

    ## Users
    GET /api/users
    GET /api/users/:id
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_wiki_create` → creates the page

### Set up wiki navigation

```
@Taiga Wiki Create navigation links for project my-project wiki:
  1. "Home" → home
  2. "API Reference" → api-reference
  3. "Contributing Guide" → contributing
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_wiki_links_create` × 3 → creates each navigation link

### Review page history

```
@Taiga Wiki Show the change history for wiki page "api-reference" in project my-project
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_wiki_get_by_slug` → gets page ID
3. `taiga_wiki_history` → returns version history

---

## Team Management

### Invite team members

```
@Taiga Team Invite these people to project my-project:
  - alice@company.com as Developer
  - bob@company.com as UX Designer
  - carol@company.com as Product Owner
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_roles_list` → finds role IDs for each role name
3. `taiga_memberships_bulk_create` → invites all 3 members

### Review team composition

```
@Taiga Team List all members and their roles in project my-project
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_memberships_list` → returns all members with roles

### Change a member's role

```
@Taiga Team Change bob's role to "Tech Lead" in project my-project
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_memberships_list` → finds bob's membership ID
3. `taiga_roles_list` → finds "Tech Lead" role ID
4. `taiga_memberships_update` → updates the role

---

## Reporter

### Sprint burndown report

```
@Taiga Reporter Generate a sprint burndown report for project my-project
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_milestones_list` → finds current sprint
3. `taiga_milestones_stats` → gets burndown data
4. Agent formats the data into a readable report

### Project health dashboard

```
@Taiga Reporter Give me a project health overview for my-project
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_projects_stats` → overall project stats
3. `taiga_projects_issues_stats` → issue distribution
4. `taiga_projects_member_stats` → member activity
5. Agent combines all data into a dashboard summary

### Team activity timeline

```
@Taiga Reporter Show me what the team has been doing this week in project my-project
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_timeline_project` → recent project activity
3. Agent filters and formats the timeline

---

## Project Setup

### Create a new project

```
@Taiga Project Setup Create a new Scrum project called "Mobile App" with description "iOS and Android mobile app"
```

**Tools called**:

1. `taiga_projects_create` → creates the project with Scrum template

### Configure custom statuses

```
@Taiga Project Setup Add these custom user story statuses to project my-project:
  1. "Design" (after "New")
  2. "Code Review" (after "In Progress")
  3. "QA" (after "Code Review")
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_userstory_statuses_list` → gets existing statuses
3. `taiga_userstory_statuses_create` × 3 → creates each new status
4. `taiga_userstory_statuses_bulk_update_order` → sets the display order

### Set up webhooks

```
@Taiga Project Setup Create a webhook for project my-project:
  URL: https://ci.example.com/hooks/taiga
  Events: all
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_webhooks_create` → creates the webhook
3. `taiga_webhooks_test` → sends a test payload

### Export a project

```
@Taiga Project Setup Export project my-project as a backup
```

**Tools called**:

1. `taiga_resolver_project` → resolves slug
2. `taiga_project_export` → triggers the export
