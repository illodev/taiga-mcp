import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerUserTools(server: McpServer, client: TaigaClient) {
  server.tool(
    "taiga_users_list",
    "List users. Filter by project.",
    { project: z.number().optional().describe("Project ID") },
    async (params) => {
      const data = await client.get(
        "/users",
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
    "taiga_users_get",
    "Get a user by ID.",
    { id: z.number().describe("User ID") },
    async ({ id }) => {
      const data = await client.get(`/users/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_users_me",
    "Get current authenticated user info.",
    {},
    async () => {
      const data = await client.get("/users/me");
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_users_stats",
    "Get user stats.",
    { id: z.number().describe("User ID") },
    async ({ id }) => {
      const data = await client.get(`/users/${id}/stats`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_users_liked",
    "List projects liked by a user.",
    { id: z.number().describe("User ID") },
    async ({ id }) => {
      const data = await client.get(`/users/${id}/liked`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_users_voted",
    "List items voted by a user.",
    { id: z.number().describe("User ID") },
    async ({ id }) => {
      const data = await client.get(`/users/${id}/voted`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_users_watched",
    "List items watched by a user.",
    { id: z.number().describe("User ID") },
    async ({ id }) => {
      const data = await client.get(`/users/${id}/watched`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_users_contacts",
    "List contacts of a user.",
    { id: z.number().describe("User ID") },
    async ({ id }) => {
      const data = await client.get(`/users/${id}/contacts`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );
}
