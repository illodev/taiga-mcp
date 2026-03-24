import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerWikiTools(server: McpServer, client: TaigaClient) {
  // ── Wiki Pages ──
  server.tool(
    "taiga_wiki_list",
    "List wiki pages. Filter by project.",
    { project: z.number().optional().describe("Project ID") },
    async (params) => {
      const data = await client.get("/wiki", params as Record<string, unknown>);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_wiki_create",
    "Create a wiki page.",
    {
      project: z.number().describe("Project ID"),
      slug: z.string().describe("Wiki page slug"),
      content: z.string().describe("Wiki page content (markdown)"),
      watchers: z.array(z.number()).optional(),
    },
    async (params) => {
      const data = await client.post("/wiki", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_wiki_get",
    "Get a wiki page by ID.",
    { id: z.number().describe("Wiki page ID") },
    async ({ id }) => {
      const data = await client.get(`/wiki/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_wiki_get_by_slug",
    "Get a wiki page by slug and project.",
    {
      slug: z.string().describe("Wiki page slug"),
      project: z.number().describe("Project ID"),
    },
    async (params) => {
      const data = await client.get(
        "/wiki/by_slug",
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
    "taiga_wiki_update",
    "Update a wiki page (partial).",
    {
      id: z.number().describe("Wiki page ID"),
      content: z.string().optional(),
      slug: z.string().optional(),
      version: z.number().describe("Current version for conflict check"),
    },
    async ({ id, ...body }) => {
      const data = await client.patch(`/wiki/${id}`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_wiki_delete",
    "Delete a wiki page.",
    { id: z.number().describe("Wiki page ID") },
    async ({ id }) => {
      await client.delete(`/wiki/${id}`);
      return {
        content: [{ type: "text" as const, text: "Wiki page deleted." }],
      };
    },
  );

  server.tool(
    "taiga_wiki_watch",
    "Watch a wiki page.",
    { id: z.number().describe("Wiki page ID") },
    async ({ id }) => {
      await client.post(`/wiki/${id}/watch`);
      return {
        content: [{ type: "text" as const, text: "Now watching wiki page." }],
      };
    },
  );

  server.tool(
    "taiga_wiki_unwatch",
    "Stop watching a wiki page.",
    { id: z.number().describe("Wiki page ID") },
    async ({ id }) => {
      await client.post(`/wiki/${id}/unwatch`);
      return {
        content: [
          { type: "text" as const, text: "Stopped watching wiki page." },
        ],
      };
    },
  );

  server.tool(
    "taiga_wiki_watchers",
    "List watchers of a wiki page.",
    { id: z.number().describe("Wiki page ID") },
    async ({ id }) => {
      const data = await client.get(`/wiki/${id}/watchers`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_wiki_attachments_list",
    "List attachments of a wiki page.",
    {
      project: z.number().describe("Project ID"),
      object_id: z.number().describe("Wiki page ID"),
    },
    async (params) => {
      const data = await client.get(
        "/wiki/attachments",
        params as Record<string, unknown>,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  // ── Wiki Links ──
  server.tool(
    "taiga_wiki_links_list",
    "List wiki links. Filter by project.",
    { project: z.number().optional().describe("Project ID") },
    async (params) => {
      const data = await client.get(
        "/wiki-links",
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
    "taiga_wiki_links_create",
    "Create a wiki link.",
    {
      project: z.number().describe("Project ID"),
      title: z.string().describe("Link title"),
      href: z.string().describe("Wiki page slug to link to"),
      order: z.number().optional(),
    },
    async (params) => {
      const data = await client.post("/wiki-links", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_wiki_links_get",
    "Get a wiki link by ID.",
    { id: z.number().describe("Wiki link ID") },
    async ({ id }) => {
      const data = await client.get(`/wiki-links/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_wiki_links_update",
    "Update a wiki link.",
    {
      id: z.number().describe("Wiki link ID"),
      title: z.string().optional(),
      href: z.string().optional(),
      order: z.number().optional(),
    },
    async ({ id, ...body }) => {
      const data = await client.patch(`/wiki-links/${id}`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_wiki_links_delete",
    "Delete a wiki link.",
    { id: z.number().describe("Wiki link ID") },
    async ({ id }) => {
      await client.delete(`/wiki-links/${id}`);
      return {
        content: [{ type: "text" as const, text: "Wiki link deleted." }],
      };
    },
  );
}
