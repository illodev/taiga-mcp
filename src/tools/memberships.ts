import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerMembershipTools(
  server: McpServer,
  client: TaigaClient,
) {
  server.tool(
    "taiga_memberships_list",
    "List memberships. Filter by project or role.",
    {
      project: z.number().optional().describe("Project ID"),
      role: z.number().optional().describe("Role ID"),
    },
    async (params) => {
      const data = await client.get(
        "/memberships",
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
    "taiga_memberships_create",
    "Create a membership (invite user to project).",
    {
      project: z.number().describe("Project ID"),
      role: z.number().describe("Role ID"),
      username: z.string().describe("Username or email to invite"),
    },
    async (params) => {
      const data = await client.post("/memberships", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_memberships_get",
    "Get a membership by ID.",
    { id: z.number().describe("Membership ID") },
    async ({ id }) => {
      const data = await client.get(`/memberships/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_memberships_update",
    "Update a membership (change role).",
    {
      id: z.number().describe("Membership ID"),
      role: z.number().describe("New role ID"),
    },
    async ({ id, ...body }) => {
      const data = await client.patch(`/memberships/${id}`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_memberships_delete",
    "Delete a membership (remove user from project).",
    { id: z.number().describe("Membership ID") },
    async ({ id }) => {
      await client.delete(`/memberships/${id}`);
      return {
        content: [{ type: "text" as const, text: "Membership deleted." }],
      };
    },
  );

  server.tool(
    "taiga_memberships_bulk_create",
    "Bulk invite members to a project.",
    {
      project_id: z.number().describe("Project ID"),
      bulk_memberships: z
        .array(
          z.object({
            role_id: z.number().describe("Role ID"),
            username: z.string().describe("Username or email"),
          }),
        )
        .describe("Array of membership invitations"),
    },
    async (params) => {
      const data = await client.post("/memberships/bulk_create", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );
}
