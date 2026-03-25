#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { TaigaClient } from "./client.js";

import { registerProjectTools } from "./tools/projects.js";
import { registerEpicTools } from "./tools/epics.js";
import { registerUserStoryTools } from "./tools/userstories.js";
import { registerTaskTools } from "./tools/tasks.js";
import { registerIssueTools } from "./tools/issues.js";
import { registerMilestoneTools } from "./tools/milestones.js";
import { registerWikiTools } from "./tools/wiki.js";
import { registerMembershipTools } from "./tools/memberships.js";
import { registerRoleTools } from "./tools/roles.js";
import { registerUserTools } from "./tools/users.js";
import { registerStatusTools } from "./tools/statuses.js";
import { registerCustomAttributeTools } from "./tools/custom-attributes.js";
import { registerHistoryTools } from "./tools/history.js";
import { registerSearchTools } from "./tools/search.js";
import { registerTimelineTools } from "./tools/timeline.js";
import { registerResolverTools } from "./tools/resolver.js";
import { registerWebhookTools } from "./tools/webhooks.js";
import { registerExportImportTools } from "./tools/export-import.js";

async function main() {
  const server = new McpServer({
    name: "taiga-mcp",
    version: "1.0.0",
  });

  const client = new TaigaClient();

  // Register all tool modules
  registerProjectTools(server, client);
  registerEpicTools(server, client);
  registerUserStoryTools(server, client);
  registerTaskTools(server, client);
  registerIssueTools(server, client);
  registerMilestoneTools(server, client);
  registerWikiTools(server, client);
  registerMembershipTools(server, client);
  registerRoleTools(server, client);
  registerUserTools(server, client);
  registerStatusTools(server, client);
  registerCustomAttributeTools(server, client);
  registerHistoryTools(server, client);
  registerSearchTools(server, client);
  registerTimelineTools(server, client);
  registerResolverTools(server, client);
  registerWebhookTools(server, client);
  registerExportImportTools(server, client);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
