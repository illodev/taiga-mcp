import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerTimelineTools(server: McpServer, client: TaigaClient) {
  server.tool(
    "taiga_timeline_user",
    "Get timeline for a user.",
    {
      user_id: z.number().describe("User ID"),
      page: z.number().optional(),
    },
    async ({ user_id, ...params }) => {
      const data = await client.get(
        `/timeline/user/${user_id}`,
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
    "taiga_timeline_profile",
    "Get timeline for a user profile (public events only).",
    {
      user_id: z.number().describe("User ID"),
      page: z.number().optional(),
    },
    async ({ user_id, ...params }) => {
      const data = await client.get(
        `/timeline/profile/${user_id}`,
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
    "taiga_timeline_project",
    "Get timeline for a project.",
    {
      project_id: z.number().describe("Project ID"),
      page: z.number().optional(),
    },
    async ({ project_id, ...params }) => {
      const data = await client.get(
        `/timeline/project/${project_id}`,
        params as Record<string, unknown>,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );
}
