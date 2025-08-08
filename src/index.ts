#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

// Importar generadores
import { ReactGenerator } from "./generators/react-generator.js";
import { VueGenerator } from "./generators/vue-generator.js";
import { CSSGenerator } from "./generators/css-generator.js";
import { HookGenerator } from "./generators/hook-generator.js";

// Importar definiciones de herramientas
import { toolDefinitions } from "./tools/tool-definitions.js";

// Importar tipos
import {
  ReactComponentArgs,
  VueComponentArgs,
  CSSUtilitiesArgs,
  APIHookArgs,
} from "./utils/types.js";

class FrontendCodeGenerator {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "frontend-code-generator",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    // Lista de herramientas disponibles
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return { tools: toolDefinitions };
    });

    // Manejo de llamadas a herramientas
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "create_react_component":
            return ReactGenerator.generateComponent(args as ReactComponentArgs);

          case "create_vue_component":
            return VueGenerator.generateComponent(args as VueComponentArgs);

          case "create_css_utilities":
            return CSSGenerator.generateUtilities(args as CSSUtilitiesArgs);

          case "create_api_hook":
            return HookGenerator.generateAPIHook(args as APIHookArgs);

          default:
            throw new McpError(ErrorCode.MethodNotFound, `Tool ${name} not found`);
        }
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Error in ${name}: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("🚀 Frontend Code Generator MCP Server running on stdio");
  }
}

const server = new FrontendCodeGenerator();
server.run().catch(console.error);
