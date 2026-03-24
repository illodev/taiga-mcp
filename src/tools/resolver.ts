import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaigaClient } from "../client.js";

export function registerResolverTools(server: McpServer, client: TaigaClient) {
  server.tool(
    "taiga_resolver_project",
    "Resolve a project slug to its ID.",
    { project: z.string().describe("Project slug") },
    async (params) => {
      const data = await client.get(
        "/resolver",
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
    "taiga_resolver_userstory",
    "Resolve a user story ref to its ID.",
    {
      project: z.string().describe("Project slug"),
      us: z.number().describe("User story ref number"),
    },
    async (params) => {
      const data = await client.get(
        "/resolver",
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
    "taiga_resolver_issue",
    "Resolve an issue ref to its ID.",
    {
      project: z.string().describe("Project slug"),
      issue: z.number().describe("Issue ref number"),
    },
    async (params) => {
      const data = await client.get(
        "/resolver",
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
    "taiga_resolver_task",
    "Resolve a task ref to its ID.",
    {
      project: z.string().describe("Project slug"),
      task: z.number().describe("Task ref number"),
    },
    async (params) => {
      const data = await client.get(
        "/resolver",
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
    "taiga_resolver_milestone",
    "Resolve a milestone slug to its ID.",
    {
      project: z.string().describe("Project slug"),
      milestone: z.string().describe("Milestone slug"),
    },
    async (params) => {
      const data = await client.get(
        "/resolver",
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
    "taiga_resolver_wiki",
    "Resolve a wiki page slug to its ID.",
    {
      project: z.string().describe("Project slug"),
      wiki: z.string().describe("Wiki page slug"),
    },
    async (params) => {
      const data = await client.get(
        "/resolver",
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
    "taiga_resolver_epic",
    "Resolve an epic ref to its ID.",
    {
      project: z.string().describe("Project slug"),
      epic: z.number().describe("Epic ref number"),
    },
    async (params) => {
      const data = await client.get(
        "/resolver",
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
