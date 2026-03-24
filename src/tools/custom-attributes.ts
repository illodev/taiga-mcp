import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

function registerCustomAttributeResource(
  server: McpServer,
  client: TaigaClient,
  entityType: string,
  endpoint: string,
  valuesEndpoint: string,
) {
  // Definitions
  server.tool(
    `taiga_${entityType}_custom_attributes_list`,
    `List custom attribute definitions for ${entityType}. Filter by project.`,
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
    `taiga_${entityType}_custom_attributes_create`,
    `Create a custom attribute definition for ${entityType}.`,
    {
      project: z.number().describe("Project ID"),
      name: z.string().describe("Attribute name"),
      description: z.string().optional(),
      order: z.number().optional(),
      type: z
        .string()
        .optional()
        .describe(
          "Attribute type (text, multiline, richtext, date, url, dropdown, checkbox, number)",
        ),
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
    `taiga_${entityType}_custom_attributes_get`,
    `Get a custom attribute definition for ${entityType}.`,
    { id: z.number().describe("Custom attribute ID") },
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
    `taiga_${entityType}_custom_attributes_update`,
    `Update a custom attribute definition for ${entityType}.`,
    {
      id: z.number().describe("Custom attribute ID"),
      name: z.string().optional(),
      description: z.string().optional(),
      order: z.number().optional(),
      type: z.string().optional(),
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
    `taiga_${entityType}_custom_attributes_delete`,
    `Delete a custom attribute definition for ${entityType}.`,
    { id: z.number().describe("Custom attribute ID") },
    async ({ id }) => {
      await client.delete(`/${endpoint}/${id}`);
      return {
        content: [{ type: "text" as const, text: "Custom attribute deleted." }],
      };
    },
  );

  // Values
  server.tool(
    `taiga_${entityType}_custom_attributes_values_get`,
    `Get custom attribute values for a specific ${entityType}.`,
    { id: z.number().describe(`${entityType} ID`) },
    async ({ id }) => {
      const data = await client.get(`/${valuesEndpoint}/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    `taiga_${entityType}_custom_attributes_values_update`,
    `Update custom attribute values for a specific ${entityType}.`,
    {
      id: z.number().describe(`${entityType} ID`),
      attributes_values: z
        .record(z.string(), z.string())
        .describe("Map of attribute_id -> value"),
      version: z.number().describe("Current version for conflict check"),
    },
    async ({ id, ...body }) => {
      const data = await client.patch(`/${valuesEndpoint}/${id}`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );
}

export function registerCustomAttributeTools(
  server: McpServer,
  client: TaigaClient,
) {
  registerCustomAttributeResource(
    server,
    client,
    "epic",
    "epic-custom-attributes",
    "epics/custom-attributes-values",
  );
  registerCustomAttributeResource(
    server,
    client,
    "userstory",
    "userstory-custom-attributes",
    "userstories/custom-attributes-values",
  );
  registerCustomAttributeResource(
    server,
    client,
    "task",
    "task-custom-attributes",
    "tasks/custom-attributes-values",
  );
  registerCustomAttributeResource(
    server,
    client,
    "issue",
    "issue-custom-attributes",
    "issues/custom-attributes-values",
  );
}
