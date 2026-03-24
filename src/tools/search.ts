import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerSearchTools(server: McpServer, client: TaigaClient) {
  server.tool(
    "taiga_search",
    "Global search across a project (user stories, tasks, issues, wiki pages).",
    {
      project: z.number().describe("Project ID"),
      text: z.string().describe("Search text"),
    },
    async (params) => {
      const data = await client.get(
        "/search",
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
