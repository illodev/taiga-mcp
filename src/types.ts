import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export type TaigaClient = {
  get: (
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ) => Promise<unknown>;
  post: (path: string, body?: unknown) => Promise<unknown>;
  put: (path: string, body?: unknown) => Promise<unknown>;
  patch: (path: string, body?: unknown) => Promise<unknown>;
  delete: (path: string) => Promise<unknown>;
};

export type ToolRegistrar = (server: McpServer, client: TaigaClient) => void;
