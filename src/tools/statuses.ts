import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

// Helper to register CRUD + bulk_update_order for a status-like resource
function registerStatusResource(
  server: McpServer,
  client: TaigaClient,
  name: string,
  endpoint: string,
  bulkField: string,
) {
  server.tool(
    `taiga_${name}_list`,
    `List ${name.replace(/_/g, " ")}. Filter by project.`,
    { project: z.number().optional().describe("Project ID") },
    async (params) => {
      const data = await client.get(
        `/${endpoint}`,
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
    `taiga_${name}_create`,
    `Create a new ${name.replace(/_/g, " ")}.`,
    {
      project: z.number().describe("Project ID"),
      name: z.string().describe("Name"),
      color: z.string().optional().describe("HEX color"),
      order: z.number().optional(),
      is_closed: z.boolean().optional(),
    },
    async (params) => {
      const data = await client.post(`/${endpoint}`, params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    `taiga_${name}_get`,
    `Get a ${name.replace(/_/g, " ")} by ID.`,
    { id: z.number().describe("ID") },
    async ({ id }) => {
      const data = await client.get(`/${endpoint}/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    `taiga_${name}_update`,
    `Update a ${name.replace(/_/g, " ")} (partial).`,
    {
      id: z.number().describe("ID"),
      name: z.string().optional(),
      color: z.string().optional(),
      order: z.number().optional(),
      is_closed: z.boolean().optional(),
    },
    async ({ id, ...body }) => {
      const data = await client.patch(`/${endpoint}/${id}`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    `taiga_${name}_delete`,
    `Delete a ${name.replace(/_/g, " ")}.`,
    { id: z.number().describe("ID") },
    async ({ id }) => {
      await client.delete(`/${endpoint}/${id}`);
      return {
        content: [
          {
            type: "text" as const,
            text: `${name.replace(/_/g, " ")} deleted.`,
          },
        ],
      };
    },
  );

  server.tool(
    `taiga_${name}_bulk_update_order`,
    `Bulk update order of ${name.replace(/_/g, " ")}.`,
    {
      project: z.number().describe("Project ID"),
      bulk_orders: z
        .array(z.array(z.number()))
        .describe("Array of [id, order] pairs"),
    },
    async ({ project, bulk_orders }) => {
      const data = await client.post(`/${endpoint}/bulk_update_order`, {
        project,
        [bulkField]: bulk_orders,
      });
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );
}

export function registerStatusTools(server: McpServer, client: TaigaClient) {
  registerStatusResource(
    server,
    client,
    "userstory_statuses",
    "userstory-statuses",
    "bulk_userstory_statuses",
  );
  registerStatusResource(
    server,
    client,
    "task_statuses",
    "task-statuses",
    "bulk_task_statuses",
  );
  registerStatusResource(
    server,
    client,
    "issue_statuses",
    "issue-statuses",
    "bulk_issue_statuses",
  );
  registerStatusResource(
    server,
    client,
    "issue_types",
    "issue-types",
    "bulk_issue_types",
  );
  registerStatusResource(
    server,
    client,
    "priorities",
    "priorities",
    "bulk_priorities",
  );
  registerStatusResource(
    server,
    client,
    "severities",
    "severities",
    "bulk_severities",
  );
  registerStatusResource(server, client, "points", "points", "bulk_points");
}
