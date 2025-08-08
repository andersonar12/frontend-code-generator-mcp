export interface ReactComponentArgs {
  name: string;
  props?: string[];
  typescript?: boolean;
  styled?: boolean;
}

export interface VueComponentArgs {
  name: string;
  composition?: boolean;
  typescript?: boolean;
}

export interface CSSUtilitiesArgs {
  type: "flexbox" | "grid" | "buttons" | "cards";
}

export interface APIHookArgs {
  name: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

// Tipos más específicos para MCP
export interface MCPTextContent {
  type: "text";
  text: string;
}

export interface MCPResponse {
  content: MCPTextContent[];
}

// Tipos para argumentos más flexibles
export type ToolArguments = Record<string, unknown>;
