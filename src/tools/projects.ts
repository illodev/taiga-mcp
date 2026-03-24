import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerProjectTools(server: McpServer, client: TaigaClient) {
  server.tool(
    "taiga_projects_list",
    "List projects. Optionally filter by member, is_featured, etc.",
    {
      member: z.number().optional().describe("Filter by member user ID"),
      is_looking_for_people: z.boolean().optional(),
      is_featured: z.boolean().optional(),
      is_backlog_activated: z.boolean().optional(),
      is_kanban_activated: z.boolean().optional(),
      order_by: z.string().optional().describe("Order field"),
    },
    async (params) => {
      const data = await client.get(
        "/projects",
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
    "taiga_projects_create",
    "Create a new project.",
    {
      name: z.string().describe("Project name"),
      description: z.string().optional(),
      is_backlog_activated: z.boolean().optional(),
      is_issues_activated: z.boolean().optional(),
      is_kanban_activated: z.boolean().optional(),
      is_wiki_activated: z.boolean().optional(),
      is_private: z.boolean().optional(),
      total_milestones: z.number().optional(),
      total_story_points: z.number().optional(),
    },
    async (params) => {
      const data = await client.post("/projects", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_projects_get",
    "Get a project by its ID.",
    { id: z.number().describe("Project ID") },
    async ({ id }) => {
      const data = await client.get(`/projects/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_projects_get_by_slug",
    "Get a project by its slug.",
    { slug: z.string().describe("Project slug") },
    async ({ slug }) => {
      const data = await client.get("/projects/by_slug", { slug });
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_projects_update",
    "Update a project (partial update).",
    {
      id: z.number().describe("Project ID"),
      name: z.string().optional(),
      description: z.string().optional(),
      is_backlog_activated: z.boolean().optional(),
      is_issues_activated: z.boolean().optional(),
      is_kanban_activated: z.boolean().optional(),
      is_wiki_activated: z.boolean().optional(),
      is_private: z.boolean().optional(),
    },
    async ({ id, ...body }) => {
      const data = await client.patch(`/projects/${id}`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_projects_delete",
    "Delete a project by its ID.",
    { id: z.number().describe("Project ID") },
    async ({ id }) => {
      await client.delete(`/projects/${id}`);
      return {
        content: [
          { type: "text" as const, text: "Project deleted successfully." },
        ],
      };
    },
  );

  server.tool(
    "taiga_projects_stats",
    "Get project stats.",
    { id: z.number().describe("Project ID") },
    async ({ id }) => {
      const data = await client.get(`/projects/${id}/stats`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_projects_member_stats",
    "Get project member stats.",
    { id: z.number().describe("Project ID") },
    async ({ id }) => {
      const data = await client.get(`/projects/${id}/member_stats`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_projects_issues_stats",
    "Get project issues stats.",
    { id: z.number().describe("Project ID") },
    async ({ id }) => {
      const data = await client.get(`/projects/${id}/issues_stats`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_projects_create_tag",
    "Create a tag in a project.",
    {
      id: z.number().describe("Project ID"),
      tag: z.string().describe("Tag name"),
      color: z.string().optional().describe("HEX color"),
    },
    async ({ id, ...body }) => {
      const data = await client.post(`/projects/${id}/create_tag`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_projects_edit_tag",
    "Edit a tag in a project.",
    {
      id: z.number().describe("Project ID"),
      from_tag: z.string().describe("Current tag name"),
      to_tag: z.string().optional().describe("New tag name"),
      color: z.string().optional().describe("New HEX color"),
    },
    async ({ id, ...body }) => {
      const data = await client.post(`/projects/${id}/edit_tag`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_projects_delete_tag",
    "Delete a tag from a project.",
    {
      id: z.number().describe("Project ID"),
      tag: z.string().describe("Tag name"),
    },
    async ({ id, ...body }) => {
      const data = await client.post(`/projects/${id}/delete_tag`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_projects_like",
    "Like a project.",
    { id: z.number().describe("Project ID") },
    async ({ id }) => {
      await client.post(`/projects/${id}/like`);
      return { content: [{ type: "text" as const, text: "Project liked." }] };
    },
  );

  server.tool(
    "taiga_projects_unlike",
    "Unlike a project.",
    { id: z.number().describe("Project ID") },
    async ({ id }) => {
      await client.post(`/projects/${id}/unlike`);
      return { content: [{ type: "text" as const, text: "Project unliked." }] };
    },
  );

  server.tool(
    "taiga_projects_fans",
    "List fans of a project.",
    { id: z.number().describe("Project ID") },
    async ({ id }) => {
      const data = await client.get(`/projects/${id}/fans`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_projects_watch",
    "Watch a project.",
    {
      id: z.number().describe("Project ID"),
      notify_level: z.number().optional().describe("1=all, 2=involved, 3=none"),
    },
    async ({ id, ...body }) => {
      await client.post(`/projects/${id}/watch`, body);
      return {
        content: [{ type: "text" as const, text: "Now watching project." }],
      };
    },
  );

  server.tool(
    "taiga_projects_unwatch",
    "Stop watching a project.",
    { id: z.number().describe("Project ID") },
    async ({ id }) => {
      await client.post(`/projects/${id}/unwatch`);
      return {
        content: [{ type: "text" as const, text: "Stopped watching project." }],
      };
    },
  );

  server.tool(
    "taiga_projects_watchers",
    "List watchers of a project.",
    { id: z.number().describe("Project ID") },
    async ({ id }) => {
      const data = await client.get(`/projects/${id}/watchers`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );
}
