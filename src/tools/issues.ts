import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerIssueTools(server: McpServer, client: TaigaClient) {
  server.tool(
    "taiga_issues_list",
    "List issues with optional filters.",
    {
      project: z.number().optional().describe("Project ID"),
      status: z.number().optional(),
      severity: z.number().optional(),
      priority: z.number().optional(),
      owner: z.number().optional(),
      assigned_to: z.number().optional(),
      tags: z.string().optional().describe("Comma-separated tags"),
      type: z.number().optional().describe("Issue type ID"),
      role: z.number().optional(),
      watchers: z.number().optional(),
      status__is_closed: z.boolean().optional(),
      exclude_status: z.number().optional(),
      exclude_severity: z.number().optional(),
      exclude_priority: z.number().optional(),
      exclude_tags: z.string().optional(),
      exclude_assigned_to: z.number().optional(),
      exclude_role: z.number().optional(),
      exclude_owner: z.number().optional(),
      exclude_type: z.number().optional(),
      order_by: z
        .string()
        .optional()
        .describe("Order field (e.g. 'severity', 'priority', 'status')"),
    },
    async (params) => {
      const data = await client.get(
        "/issues",
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
    "taiga_issues_create",
    "Create a new issue.",
    {
      project: z.number().describe("Project ID"),
      subject: z.string().describe("Issue subject"),
      description: z.string().optional(),
      assigned_to: z.number().optional(),
      blocked_note: z.string().optional(),
      is_blocked: z.boolean().optional(),
      is_closed: z.boolean().optional(),
      milestone: z.number().optional(),
      priority: z.number().optional(),
      severity: z.number().optional(),
      status: z.number().optional(),
      type: z.number().optional(),
      tags: z.array(z.string()).optional(),
      watchers: z.array(z.number()).optional(),
    },
    async (params) => {
      const data = await client.post("/issues", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_issues_get",
    "Get an issue by ID.",
    { id: z.number().describe("Issue ID") },
    async ({ id }) => {
      const data = await client.get(`/issues/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_issues_get_by_ref",
    "Get an issue by ref and project.",
    {
      ref: z.number().describe("Issue ref number"),
      project: z.number().describe("Project ID"),
    },
    async (params) => {
      const data = await client.get(
        "/issues/by_ref",
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
    "taiga_issues_update",
    "Update an issue (partial).",
    {
      id: z.number().describe("Issue ID"),
      subject: z.string().optional(),
      description: z.string().optional(),
      assigned_to: z.number().optional(),
      status: z.number().optional(),
      priority: z.number().optional(),
      severity: z.number().optional(),
      type: z.number().optional(),
      milestone: z.number().optional(),
      tags: z.array(z.string()).optional(),
      is_blocked: z.boolean().optional(),
      blocked_note: z.string().optional(),
      is_closed: z.boolean().optional(),
      version: z.number().describe("Current version for conflict check"),
    },
    async ({ id, ...body }) => {
      const data = await client.patch(`/issues/${id}`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_issues_delete",
    "Delete an issue.",
    { id: z.number().describe("Issue ID") },
    async ({ id }) => {
      await client.delete(`/issues/${id}`);
      return { content: [{ type: "text" as const, text: "Issue deleted." }] };
    },
  );

  server.tool(
    "taiga_issues_bulk_create",
    "Bulk create issues.",
    {
      project_id: z.number().describe("Project ID"),
      bulk_issues: z.string().describe("Newline-separated issue subjects"),
    },
    async (params) => {
      const data = await client.post("/issues/bulk_create", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_issues_filters_data",
    "Get filters data for issues in a project.",
    { project: z.number().describe("Project ID") },
    async (params) => {
      const data = await client.get(
        "/issues/filters_data",
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
    "taiga_issues_upvote",
    "Upvote an issue.",
    { id: z.number().describe("Issue ID") },
    async ({ id }) => {
      await client.post(`/issues/${id}/upvote`);
      return { content: [{ type: "text" as const, text: "Issue upvoted." }] };
    },
  );

  server.tool(
    "taiga_issues_downvote",
    "Remove vote from an issue.",
    { id: z.number().describe("Issue ID") },
    async ({ id }) => {
      await client.post(`/issues/${id}/downvote`);
      return { content: [{ type: "text" as const, text: "Vote removed." }] };
    },
  );

  server.tool(
    "taiga_issues_voters",
    "List voters of an issue.",
    { id: z.number().describe("Issue ID") },
    async ({ id }) => {
      const data = await client.get(`/issues/${id}/voters`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  // Watching
  server.tool(
    "taiga_issues_watch",
    "Watch an issue.",
    { id: z.number().describe("Issue ID") },
    async ({ id }) => {
      await client.post(`/issues/${id}/watch`);
      return {
        content: [{ type: "text" as const, text: "Now watching issue." }],
      };
    },
  );

  server.tool(
    "taiga_issues_unwatch",
    "Stop watching an issue.",
    { id: z.number().describe("Issue ID") },
    async ({ id }) => {
      await client.post(`/issues/${id}/unwatch`);
      return {
        content: [{ type: "text" as const, text: "Stopped watching issue." }],
      };
    },
  );

  server.tool(
    "taiga_issues_watchers",
    "List watchers of an issue.",
    { id: z.number().describe("Issue ID") },
    async ({ id }) => {
      const data = await client.get(`/issues/${id}/watchers`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  // Attachments
  server.tool(
    "taiga_issues_attachments_list",
    "List attachments of an issue.",
    {
      project: z.number().describe("Project ID"),
      object_id: z.number().describe("Issue ID"),
    },
    async (params) => {
      const data = await client.get(
        "/issues/attachments",
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
    "taiga_issues_attachment_get",
    "Get a specific issue attachment.",
    { id: z.number().describe("Attachment ID") },
    async ({ id }) => {
      const data = await client.get(`/issues/attachments/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );
}
