import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerUserStoryTools(server: McpServer, client: TaigaClient) {
  server.tool(
    "taiga_userstories_list",
    "List user stories with optional filters.",
    {
      project: z.number().optional().describe("Project ID"),
      milestone: z.number().optional().describe("Milestone/Sprint ID"),
      milestone__isnull: z
        .boolean()
        .optional()
        .describe("True for backlog stories"),
      status: z.number().optional().describe("Status ID"),
      status__is_archived: z.boolean().optional(),
      tags: z.string().optional().describe("Comma-separated tags"),
      watchers: z.number().optional().describe("Watcher user ID"),
      assigned_to: z.number().optional().describe("Assigned user ID"),
      epic: z.number().optional().describe("Epic ID"),
      role: z.number().optional().describe("Role ID"),
      status__is_closed: z.boolean().optional(),
      exclude_status: z.number().optional(),
      exclude_tags: z.string().optional(),
      exclude_assigned_to: z.number().optional(),
      exclude_role: z.number().optional(),
      order_by: z.string().optional().describe("Order field"),
    },
    async (params) => {
      const data = await client.get(
        "/userstories",
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
    "taiga_userstories_create",
    "Create a new user story.",
    {
      project: z.number().describe("Project ID"),
      subject: z.string().describe("User story subject"),
      description: z.string().optional(),
      assigned_to: z.number().optional(),
      assigned_users: z.array(z.number()).optional(),
      backlog_order: z.number().optional(),
      blocked_note: z.string().optional(),
      client_requirement: z.boolean().optional(),
      is_blocked: z.boolean().optional(),
      is_closed: z.boolean().optional(),
      kanban_order: z.number().optional(),
      milestone: z.number().optional().describe("Sprint/Milestone ID"),
      points: z
        .record(z.string(), z.number())
        .optional()
        .describe("Points per role {role_id: points}"),
      sprint_order: z.number().optional(),
      status: z.number().optional().describe("Status ID"),
      tags: z.array(z.string()).optional(),
      team_requirement: z.boolean().optional(),
      watchers: z.array(z.number()).optional(),
    },
    async (params) => {
      const data = await client.post("/userstories", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_userstories_get",
    "Get a user story by ID.",
    { id: z.number().describe("User Story ID") },
    async ({ id }) => {
      const data = await client.get(`/userstories/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_userstories_get_by_ref",
    "Get a user story by ref and project.",
    {
      ref: z.number().describe("User story ref number"),
      project: z.number().describe("Project ID"),
    },
    async (params) => {
      const data = await client.get(
        "/userstories/by_ref",
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
    "taiga_userstories_update",
    "Update a user story (partial).",
    {
      id: z.number().describe("User Story ID"),
      subject: z.string().optional(),
      description: z.string().optional(),
      assigned_to: z.number().optional(),
      assigned_users: z.array(z.number()).optional(),
      status: z.number().optional(),
      milestone: z.number().optional(),
      points: z.record(z.string(), z.number()).optional(),
      tags: z.array(z.string()).optional(),
      is_blocked: z.boolean().optional(),
      blocked_note: z.string().optional(),
      is_closed: z.boolean().optional(),
      version: z.number().describe("Current version for conflict check"),
    },
    async ({ id, ...body }) => {
      const data = await client.patch(`/userstories/${id}`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_userstories_delete",
    "Delete a user story.",
    { id: z.number().describe("User Story ID") },
    async ({ id }) => {
      await client.delete(`/userstories/${id}`);
      return {
        content: [{ type: "text" as const, text: "User story deleted." }],
      };
    },
  );

  server.tool(
    "taiga_userstories_bulk_create",
    "Bulk create user stories.",
    {
      project_id: z.number().describe("Project ID"),
      bulk_stories: z
        .string()
        .describe("Newline-separated user story subjects"),
      status_id: z.number().optional(),
    },
    async (params) => {
      const data = await client.post("/userstories/bulk_create", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_userstories_bulk_update_backlog_order",
    "Bulk update backlog order of user stories.",
    {
      project_id: z.number().describe("Project ID"),
      bulk_stories: z
        .array(z.array(z.number()))
        .describe("Array of [us_id, order] pairs"),
    },
    async (params) => {
      const data = await client.post(
        "/userstories/bulk_update_backlog_order",
        params,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_userstories_bulk_update_sprint_order",
    "Bulk update sprint order of user stories.",
    {
      project_id: z.number().describe("Project ID"),
      bulk_stories: z
        .array(z.array(z.number()))
        .describe("Array of [us_id, order] pairs"),
    },
    async (params) => {
      const data = await client.post(
        "/userstories/bulk_update_sprint_order",
        params,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_userstories_bulk_update_kanban_order",
    "Bulk update kanban order of user stories.",
    {
      project_id: z.number().describe("Project ID"),
      bulk_stories: z
        .array(z.array(z.number()))
        .describe("Array of [us_id, order] pairs"),
    },
    async (params) => {
      const data = await client.post(
        "/userstories/bulk_update_kanban_order",
        params,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_userstories_filters_data",
    "Get filters data for user stories in a project.",
    { project: z.number().describe("Project ID") },
    async (params) => {
      const data = await client.get(
        "/userstories/filters_data",
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
    "taiga_userstories_upvote",
    "Upvote a user story.",
    { id: z.number().describe("User Story ID") },
    async ({ id }) => {
      await client.post(`/userstories/${id}/upvote`);
      return {
        content: [{ type: "text" as const, text: "User story upvoted." }],
      };
    },
  );

  server.tool(
    "taiga_userstories_downvote",
    "Remove vote from a user story.",
    { id: z.number().describe("User Story ID") },
    async ({ id }) => {
      await client.post(`/userstories/${id}/downvote`);
      return { content: [{ type: "text" as const, text: "Vote removed." }] };
    },
  );

  server.tool(
    "taiga_userstories_voters",
    "List voters of a user story.",
    { id: z.number().describe("User Story ID") },
    async ({ id }) => {
      const data = await client.get(`/userstories/${id}/voters`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  // Watching
  server.tool(
    "taiga_userstories_watch",
    "Watch a user story.",
    { id: z.number().describe("User Story ID") },
    async ({ id }) => {
      await client.post(`/userstories/${id}/watch`);
      return {
        content: [{ type: "text" as const, text: "Now watching user story." }],
      };
    },
  );

  server.tool(
    "taiga_userstories_unwatch",
    "Stop watching a user story.",
    { id: z.number().describe("User Story ID") },
    async ({ id }) => {
      await client.post(`/userstories/${id}/unwatch`);
      return {
        content: [
          { type: "text" as const, text: "Stopped watching user story." },
        ],
      };
    },
  );

  server.tool(
    "taiga_userstories_watchers",
    "List watchers of a user story.",
    { id: z.number().describe("User Story ID") },
    async ({ id }) => {
      const data = await client.get(`/userstories/${id}/watchers`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  // Attachments
  server.tool(
    "taiga_userstories_attachments_list",
    "List attachments of a user story.",
    {
      project: z.number().describe("Project ID"),
      object_id: z.number().describe("User Story ID"),
    },
    async (params) => {
      const data = await client.get(
        "/userstories/attachments",
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
    "taiga_userstories_attachment_get",
    "Get a specific user story attachment.",
    { id: z.number().describe("Attachment ID") },
    async ({ id }) => {
      const data = await client.get(`/userstories/attachments/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );
}
