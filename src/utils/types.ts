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

export interface MCPResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}
