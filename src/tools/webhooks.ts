import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerWebhookTools(server: McpServer, client: TaigaClient) {
  server.tool(
    "taiga_webhooks_list",
    "List webhooks. Filter by project.",
    { project: z.number().optional().describe("Project ID") },
    async (params) => {
      const data = await client.get(
        "/webhooks",
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
    "taiga_webhooks_create",
    "Create a new webhook.",
    {
      project: z.number().describe("Project ID"),
      name: z.string().describe("Webhook name"),
      url: z.string().describe("Webhook URL"),
      key: z.string().describe("Webhook secret key"),
    },
    async (params) => {
      const data = await client.post("/webhooks", params);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_webhooks_get",
    "Get a webhook by ID.",
    { id: z.number().describe("Webhook ID") },
    async ({ id }) => {
      const data = await client.get(`/webhooks/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_webhooks_update",
    "Update a webhook (partial).",
    {
      id: z.number().describe("Webhook ID"),
      name: z.string().optional(),
      url: z.string().optional(),
      key: z.string().optional(),
    },
    async ({ id, ...body }) => {
      const data = await client.patch(`/webhooks/${id}`, body);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_webhooks_delete",
    "Delete a webhook.",
    { id: z.number().describe("Webhook ID") },
    async ({ id }) => {
      await client.delete(`/webhooks/${id}`);
      return { content: [{ type: "text" as const, text: "Webhook deleted." }] };
    },
  );

  server.tool(
    "taiga_webhooks_test",
    "Test a webhook by sending a test payload.",
    { id: z.number().describe("Webhook ID") },
    async ({ id }) => {
      const data = await client.post(`/webhooks/${id}/test`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  // Webhook Logs
  server.tool(
    "taiga_webhooklogs_list",
    "List webhook logs. Filter by webhook.",
    { webhook: z.number().optional().describe("Webhook ID") },
    async (params) => {
      const data = await client.get(
        "/webhooklogs",
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
    "taiga_webhooklogs_get",
    "Get a webhook log entry by ID.",
    { id: z.number().describe("Webhook log ID") },
    async ({ id }) => {
      const data = await client.get(`/webhooklogs/${id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );

  server.tool(
    "taiga_webhooklogs_resend",
    "Resend a failed webhook delivery.",
    { id: z.number().describe("Webhook log ID") },
    async ({ id }) => {
      const data = await client.post(`/webhooklogs/${id}/resend`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
      };
    },
  );
}
