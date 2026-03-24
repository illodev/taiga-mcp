import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerRoleTools(server: McpServer, client: TaigaClient) {
  server.tool(
    "taiga_roles_list",
    "List roles. Filter by project.",
    { project: z.number().optional().describe("Project ID") },
    async (params) => {
      const data = await client.get(
        "/roles",
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
    "taiga_roles_create",
    "Create a new role.",
    {
      project: z.number().describe("Project ID"),
      name: z.string().describe("Role name"),
      permissions: z
        .array(z.string())
        .optional()
        .describe("List of permission codenames"),
      order: z.number().optional(),
      computable: z
        .boolean()
        .optional()
        .describe("Whether this role computes story points"),
    },
    async (params) => {
      const data = await client.post("/roles", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_roles_get",
    "Get a role by ID.",
    { id: z.number().describe("Role ID") },
    async ({ id }) => {
      const data = await client.get(`/roles/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_roles_update",
    "Update a role (partial).",
    {
      id: z.number().describe("Role ID"),
      name: z.string().optional(),
      permissions: z.array(z.string()).optional(),
      order: z.number().optional(),
      computable: z.boolean().optional(),
    },
    async ({ id, ...body }) => {
      const data = await client.patch(`/roles/${id}`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_roles_delete",
    "Delete a role.",
    { id: z.number().describe("Role ID") },
    async ({ id }) => {
      await client.delete(`/roles/${id}`);
      return { content: [{ type: "text" as const, text: "Role deleted." }] };
    },
  );
}
