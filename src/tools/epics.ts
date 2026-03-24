import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerEpicTools(server: McpServer, client: TaigaClient) {
  server.tool(
    "taiga_epics_list",
    "List epics. Filter by project.",
    {
      project: z.number().optional().describe("Project ID"),
      assigned_to: z.number().optional().describe("Assigned user ID"),
      status__is_closed: z.boolean().optional(),
    },
    async (params) => {
      const data = await client.get(
        "/epics",
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
    "taiga_epics_create",
    "Create a new epic.",
    {
      project: z.number().describe("Project ID"),
      subject: z.string().describe("Epic subject/name"),
      description: z.string().optional(),
      assigned_to: z.number().optional(),
      color: z.string().optional().describe("HEX color"),
      tags: z.array(z.string()).optional(),
      watchers: z.array(z.number()).optional(),
    },
    async (params) => {
      const data = await client.post("/epics", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_epics_get",
    "Get an epic by ID.",
    { id: z.number().describe("Epic ID") },
    async ({ id }) => {
      const data = await client.get(`/epics/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_epics_get_by_ref",
    "Get an epic by ref and project.",
    {
      ref: z.number().describe("Epic reference number"),
      project: z.number().describe("Project ID"),
    },
    async (params) => {
      const data = await client.get(
        "/epics/by_ref",
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
    "taiga_epics_update",
    "Update an epic (partial).",
    {
      id: z.number().describe("Epic ID"),
      subject: z.string().optional(),
      description: z.string().optional(),
      assigned_to: z.number().optional(),
      color: z.string().optional(),
      tags: z.array(z.string()).optional(),
      version: z.number().describe("Current version for conflict check"),
    },
    async ({ id, ...body }) => {
      const data = await client.patch(`/epics/${id}`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_epics_delete",
    "Delete an epic.",
    { id: z.number().describe("Epic ID") },
    async ({ id }) => {
      await client.delete(`/epics/${id}`);
      return { content: [{ type: "text" as const, text: "Epic deleted." }] };
    },
  );

  server.tool(
    "taiga_epics_bulk_create",
    "Bulk create epics.",
    {
      project_id: z.number().describe("Project ID"),
      bulk_epics: z.string().describe("Newline-separated epic subjects"),
    },
    async (params) => {
      const data = await client.post("/epics/bulk_create", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_epics_filters_data",
    "Get filters data for epics in a project.",
    { project: z.number().describe("Project ID") },
    async (params) => {
      const data = await client.get(
        "/epics/filters_data",
        params as Record<string, unknown>,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  // Related user stories
  server.tool(
    "taiga_epics_related_userstories_list",
    "List user stories related to an epic.",
    { epic_id: z.number().describe("Epic ID") },
    async ({ epic_id }) => {
      const data = await client.get(`/epics/${epic_id}/related_userstories`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_epics_related_userstories_add",
    "Add a user story to an epic.",
    {
      epic_id: z.number().describe("Epic ID"),
      user_story: z.number().describe("User Story ID"),
    },
    async ({ epic_id, ...body }) => {
      const data = await client.post(
        `/epics/${epic_id}/related_userstories`,
        body,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_epics_related_userstories_remove",
    "Remove a user story from an epic.",
    {
      epic_id: z.number().describe("Epic ID"),
      userstory_id: z.number().describe("User Story ID"),
    },
    async ({ epic_id, userstory_id }) => {
      await client.delete(
        `/epics/${epic_id}/related_userstories/${userstory_id}`,
      );
      return {
        content: [
          { type: "text" as const, text: "User story removed from epic." },
        ],
      };
    },
  );

  server.tool(
    "taiga_epics_related_userstories_bulk_create",
    "Bulk add user stories to an epic.",
    {
      epic_id: z.number().describe("Epic ID"),
      project_id: z.number().describe("Project ID"),
      bulk_userstories: z
        .string()
        .describe("Newline-separated user story subjects"),
    },
    async ({ epic_id, ...body }) => {
      const data = await client.post(
        `/epics/${epic_id}/related_userstories/bulk_create`,
        body,
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
    "taiga_epics_upvote",
    "Upvote an epic.",
    { id: z.number().describe("Epic ID") },
    async ({ id }) => {
      await client.post(`/epics/${id}/upvote`);
      return { content: [{ type: "text" as const, text: "Epic upvoted." }] };
    },
  );

  server.tool(
    "taiga_epics_downvote",
    "Remove vote from an epic.",
    { id: z.number().describe("Epic ID") },
    async ({ id }) => {
      await client.post(`/epics/${id}/downvote`);
      return {
        content: [{ type: "text" as const, text: "Vote removed from epic." }],
      };
    },
  );

  server.tool(
    "taiga_epics_voters",
    "List voters of an epic.",
    { id: z.number().describe("Epic ID") },
    async ({ id }) => {
      const data = await client.get(`/epics/${id}/voters`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  // Watching
  server.tool(
    "taiga_epics_watch",
    "Watch an epic.",
    { id: z.number().describe("Epic ID") },
    async ({ id }) => {
      await client.post(`/epics/${id}/watch`);
      return {
        content: [{ type: "text" as const, text: "Now watching epic." }],
      };
    },
  );

  server.tool(
    "taiga_epics_unwatch",
    "Stop watching an epic.",
    { id: z.number().describe("Epic ID") },
    async ({ id }) => {
      await client.post(`/epics/${id}/unwatch`);
      return {
        content: [{ type: "text" as const, text: "Stopped watching epic." }],
      };
    },
  );

  server.tool(
    "taiga_epics_watchers",
    "List watchers of an epic.",
    { id: z.number().describe("Epic ID") },
    async ({ id }) => {
      const data = await client.get(`/epics/${id}/watchers`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  // Attachments
  server.tool(
    "taiga_epics_attachments_list",
    "List attachments of an epic.",
    {
      project: z.number().describe("Project ID"),
      object_id: z.number().describe("Epic ID"),
    },
    async (params) => {
      const data = await client.get(
        "/epics/attachments",
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
    "taiga_epics_attachment_get",
    "Get a specific epic attachment.",
    { id: z.number().describe("Attachment ID") },
    async ({ id }) => {
      const data = await client.get(`/epics/attachments/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );
}
