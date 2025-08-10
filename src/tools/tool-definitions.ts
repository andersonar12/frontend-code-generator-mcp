import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const toolDefinitions: Tool[] = [
  {
    name: "create_react_component",
    description: "Genera un componente React funcional",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Nombre del componente" },
        props: {
          type: "array",
          items: { type: "string" },
          description: "Lista de props (opcional)",
          default: [],
        },
        typescript: { type: "boolean", description: "Usar TypeScript", default: true },
        styled: { type: "boolean", description: "Incluir estilos CSS", default: true },
      },
      required: ["name"],
    },
  },
  {
    name: "create_vue_component",
    description: "Genera un componente Vue 3",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Nombre del componente" },
        composition: { type: "boolean", description: "Usar Composition API", default: true },
        typescript: { type: "boolean", description: "Usar TypeScript", default: true },
      },
      required: ["name"],
    },
  },
  {
    name: "create_css_utilities",
    description: "Genera utilidades CSS comunes",
    inputSchema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["flexbox", "grid", "buttons", "cards"],
          description: "Tipo de utilidades CSS",
        },
      },
      required: ["type"],
    },
  },
  {
    name: "create_api_hook",
    description: "Genera hook personalizado para API calls",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Nombre del hook (sin use)" },
        method: {
          type: "string",
          enum: ["GET", "POST", "PUT", "DELETE"],
          default: "GET",
          description: "Método HTTP",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "create_angular_component",
    description: "Genera un componente Angular",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Nombre del componente" },
        inlineTemplate: { type: "boolean", description: "Usar plantilla en línea", default: false },
        inlineStyle: { type: "boolean", description: "Usar estilos en línea", default: false },
        skipTests: {
          type: "boolean",
          description: "Omitir la generación de archivos de prueba",
          default: false,
        },
      },
      required: ["name"],
    },
  },
  {
    name: "create_svelte_component",
    description: "Genera un componente Svelte",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Nombre del componente" },
        typescript: { type: "boolean", description: "Usar TypeScript", default: false },
        cssPreProcessor: {
          type: "string",
          enum: ["none", "scss", "less", "stylus"],
          default: "none",
          description: "Preprocesador CSS a usar",
        },
      },
      required: ["name"],
    },
  },
];
