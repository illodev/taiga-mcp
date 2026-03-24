import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerExportImportTools(
  server: McpServer,
  client: TaigaClient,
) {
  server.tool(
    "taiga_project_export",
    "Export a project (returns export data or starts async export).",
    { id: z.number().describe("Project ID") },
    async ({ id }) => {
      const data = await client.get(`/exporter/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_project_import",
    "Import a project from a JSON dump.",
    {
      dump: z.string().describe("JSON string of the project export data"),
    },
    async ({ dump }) => {
      const parsed = JSON.parse(dump);
      const data = await client.post("/importer/load_dump", parsed);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );
}
