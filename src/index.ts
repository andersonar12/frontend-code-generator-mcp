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
import { AngularGenerator } from "./generators/angular-generator.js";
import { SvelteGenerator } from "./generators/svelte-generator.js";

// Importar definiciones de herramientas
import { toolDefinitions } from "./tools/tool-definitions.js";

// Importar tipos
import {
  ReactComponentArgs,
  VueComponentArgs,
  CSSUtilitiesArgs,
  APIHookArgs,
  AngularComponentArgs,
  SvelteComponentArgs,
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
        if (!args || typeof args !== "object") {
          throw new McpError(ErrorCode.InvalidParams, "Faltan argumentos para la herramienta");
        }

        switch (name) {
          case "create_react_component": {
            const { name: compName } = args as Record<string, unknown>;
            if (typeof compName !== "string") {
              throw new McpError(
                ErrorCode.InvalidParams,
                "El nombre del componente es obligatorio"
              );
            }
            return { ...ReactGenerator.generateComponent(args as unknown as ReactComponentArgs) };
          }
          case "create_vue_component": {
            const { name: vueName } = args as Record<string, unknown>;
            if (typeof vueName !== "string") {
              throw new McpError(
                ErrorCode.InvalidParams,
                "El nombre del componente es obligatorio"
              );
            }
            return { ...VueGenerator.generateComponent(args as unknown as VueComponentArgs) };
          }
          case "create_css_utilities": {
            const { type } = args as Record<string, unknown>;
            if (typeof type !== "string") {
              throw new McpError(
                ErrorCode.InvalidParams,
                "El tipo de utilidades CSS es obligatorio"
              );
            }
            return { ...CSSGenerator.generateUtilities(args as unknown as CSSUtilitiesArgs) };
          }
          case "create_api_hook": {
            const { name: hookName } = args as Record<string, unknown>;
            if (typeof hookName !== "string") {
              throw new McpError(ErrorCode.InvalidParams, "El nombre del hook es obligatorio");
            }
            return { ...HookGenerator.generateAPIHook(args as unknown as APIHookArgs) };
          }
          case "create_angular_component": {
            const { name: angularName } = args as Record<string, unknown>;
            if (typeof angularName !== "string") {
              throw new McpError(
                ErrorCode.InvalidParams,
                "El nombre del componente es obligatorio"
              );
            }
            return {
              ...AngularGenerator.generateComponent(args as unknown as AngularComponentArgs),
            };
          }
          case "create_svelte_component": {
            const { name: svelteName } = args as Record<string, unknown>;
            if (typeof svelteName !== "string") {
              throw new McpError(
                ErrorCode.InvalidParams,
                "El nombre del componente es obligatorio"
              );
            }
            return { ...SvelteGenerator.generateComponent(args as unknown as SvelteComponentArgs) };
          }
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
