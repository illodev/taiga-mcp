import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerTaskTools(server: McpServer, client: TaigaClient) {
  server.tool(
    "taiga_tasks_list",
    "List tasks with optional filters.",
    {
      project: z.number().optional().describe("Project ID"),
      status: z.number().optional().describe("Status ID"),
      tags: z.string().optional().describe("Comma-separated tags"),
      user_story: z.number().optional().describe("User Story ID"),
      role: z.number().optional().describe("Role ID"),
      owner: z.number().optional().describe("Owner user ID"),
      milestone: z.number().optional().describe("Milestone ID"),
      watchers: z.number().optional().describe("Watcher user ID"),
      assigned_to: z.number().optional().describe("Assigned user ID"),
      status__is_closed: z.boolean().optional(),
      exclude_status: z.number().optional(),
      exclude_tags: z.string().optional(),
      exclude_assigned_to: z.number().optional(),
      exclude_role: z.number().optional(),
      exclude_owner: z.number().optional(),
      order_by: z.string().optional(),
    },
    async (params) => {
      const data = await client.get(
        "/tasks",
        params as Record<string, unknown>,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_tasks_create",
    "Create a new task.",
    {
      project: z.number().describe("Project ID"),
      subject: z.string().describe("Task subject"),
      description: z.string().optional(),
      assigned_to: z.number().optional(),
      blocked_note: z.string().optional(),
      is_blocked: z.boolean().optional(),
      is_closed: z.boolean().optional(),
      is_iocaine: z.boolean().optional(),
      milestone: z.number().optional(),
      status: z.number().optional(),
      user_story: z.number().optional().describe("User Story ID"),
      tags: z.array(z.string()).optional(),
      watchers: z.array(z.number()).optional(),
    },
    async (params) => {
      const data = await client.post("/tasks", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_tasks_get",
    "Get a task by ID.",
    { id: z.number().describe("Task ID") },
    async ({ id }) => {
      const data = await client.get(`/tasks/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_tasks_get_by_ref",
    "Get a task by ref and project.",
    {
      ref: z.number().describe("Task ref number"),
      project: z.number().describe("Project ID"),
    },
    async (params) => {
      const data = await client.get(
        "/tasks/by_ref",
        params as Record<string, unknown>,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_tasks_update",
    "Update a task (partial).",
    {
      id: z.number().describe("Task ID"),
      subject: z.string().optional(),
      description: z.string().optional(),
      assigned_to: z.number().optional(),
      status: z.number().optional(),
      milestone: z.number().optional(),
      user_story: z.number().optional(),
      tags: z.array(z.string()).optional(),
      is_blocked: z.boolean().optional(),
      blocked_note: z.string().optional(),
      is_closed: z.boolean().optional(),
      is_iocaine: z.boolean().optional(),
      version: z.number().describe("Current version for conflict check"),
    },
    async ({ id, ...body }) => {
      const data = await client.patch(`/tasks/${id}`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_tasks_delete",
    "Delete a task.",
    { id: z.number().describe("Task ID") },
    async ({ id }) => {
      await client.delete(`/tasks/${id}`);
      return { content: [{ type: "text" as const, text: "Task deleted." }] };
    },
  );

  server.tool(
    "taiga_tasks_bulk_create",
    "Bulk create tasks.",
    {
      project_id: z.number().describe("Project ID"),
      bulk_tasks: z.string().describe("Newline-separated task subjects"),
      us_id: z.number().optional().describe("User Story ID"),
      sprint_id: z.number().optional().describe("Sprint/Milestone ID"),
      status_id: z.number().optional(),
    },
    async (params) => {
      const data = await client.post("/tasks/bulk_create", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_tasks_filters_data",
    "Get filters data for tasks in a project.",
    { project: z.number().describe("Project ID") },
    async (params) => {
      const data = await client.get(
        "/tasks/filters_data",
        params as Record<string, unknown>,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  // Voting
  server.tool(
    "taiga_tasks_upvote",
    "Upvote a task.",
    { id: z.number().describe("Task ID") },
    async ({ id }) => {
      await client.post(`/tasks/${id}/upvote`);
      return { content: [{ type: "text" as const, text: "Task upvoted." }] };
    },
  );

  server.tool(
    "taiga_tasks_downvote",
    "Remove vote from a task.",
    { id: z.number().describe("Task ID") },
    async ({ id }) => {
      await client.post(`/tasks/${id}/downvote`);
      return { content: [{ type: "text" as const, text: "Vote removed." }] };
    },
  );

  server.tool(
    "taiga_tasks_voters",
    "List voters of a task.",
    { id: z.number().describe("Task ID") },
    async ({ id }) => {
      const data = await client.get(`/tasks/${id}/voters`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  // Watching
  server.tool(
    "taiga_tasks_watch",
    "Watch a task.",
    { id: z.number().describe("Task ID") },
    async ({ id }) => {
      await client.post(`/tasks/${id}/watch`);
      return {
        content: [{ type: "text" as const, text: "Now watching task." }],
      };
    },
  );

  server.tool(
    "taiga_tasks_unwatch",
    "Stop watching a task.",
    { id: z.number().describe("Task ID") },
    async ({ id }) => {
      await client.post(`/tasks/${id}/unwatch`);
      return {
        content: [{ type: "text" as const, text: "Stopped watching task." }],
      };
    },
  );

  server.tool(
    "taiga_tasks_watchers",
    "List watchers of a task.",
    { id: z.number().describe("Task ID") },
    async ({ id }) => {
      const data = await client.get(`/tasks/${id}/watchers`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  // Attachments
  server.tool(
    "taiga_tasks_attachments_list",
    "List attachments of a task.",
    {
      project: z.number().describe("Project ID"),
      object_id: z.number().describe("Task ID"),
    },
    async (params) => {
      const data = await client.get(
        "/tasks/attachments",
        params as Record<string, unknown>,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_tasks_attachment_get",
    "Get a specific task attachment.",
    { id: z.number().describe("Attachment ID") },
    async ({ id }) => {
      const data = await client.get(`/tasks/attachments/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );
}
