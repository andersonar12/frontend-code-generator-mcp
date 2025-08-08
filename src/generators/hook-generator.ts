import { APIHookArgs, MCPResponse } from "../utils/types.js";

export class HookGenerator {
  static generateAPIHook(args: APIHookArgs): MCPResponse {
    const { name, method = "GET" } = args;
    const hookName = `use${name.charAt(0).toUpperCase() + name.slice(1)}`;

    const hook = this.generateHookCode(name, hookName, method);
    const usage = this.generateUsageExample(hookName, method);
    const result = `📁 **hooks/${hookName}.ts**\n\`\`\`typescript\n${hook}\n\`\`\`\n\n${usage}`;

    return {
      content: [{ type: "text", text: result }],
    };
  }

  private static generateHookCode(name: string, hookName: string, method: string): string {
    const dataType = name.charAt(0).toUpperCase() + name.slice(1);

    const imports = this.generateImports();
    const interfaces = this.generateInterfaces(dataType, hookName);
    const hookFunction = this.generateHookFunction(hookName, dataType, method);

    return `${imports}\n\n${interfaces}\n\n${hookFunction}\n\nexport default ${hookName};`;
  }

  private static generateImports(): string {
    return `import { useState, useEffect } from 'react';`;
  }

  private static generateInterfaces(dataType: string, hookName: string): string {
    return `interface ${dataType}Data {
  // Define aquí la estructura de tus datos
  id?: number;
  [key: string]: any;
}

interface Use${dataType}Result {
  data: ${dataType}Data | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}`;
  }

  private static generateHookFunction(hookName: string, dataType: string, method: string): string {
    const parameters = method === "GET" ? "url: string" : "url: string, payload?: any";
    const useState = this.generateUseState(dataType);
    const fetchFunction = this.generateFetchFunction(method);
    const useEffect = this.generateUseEffect(method);
    const returnStatement = this.generateReturnStatement();

    return `const ${hookName} = (${parameters}): Use${dataType}Result => {
${useState}

${fetchFunction}

${useEffect}

${returnStatement}
};`;
  }

  private static generateUseState(dataType: string): string {
    return `  const [data, setData] = useState<${dataType}Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);`;
  }

  private static generateFetchFunction(method: string): string {
    const fetchOptions =
      method !== "GET"
        ? `, {
        method: '${method}',
        headers: {
          'Content-Type': 'application/json',
        },
        ${method !== "GET" ? "body: JSON.stringify(payload)," : ""}
      }`
        : "";

    return `  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url${fetchOptions});

      if (!response.ok) {
        throw new Error(\`Error: \${response.status}\`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };`;
  }

  private static generateUseEffect(method: string): string {
    const effectBody =
      method === "GET" ? "fetchData();" : "// Call fetchData() manually for non-GET methods";

    return `  useEffect(() => {
    ${effectBody}
  }, [url]);`;
  }

  private static generateReturnStatement(): string {
    return `  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };`;
  }

  private static generateUsageExample(hookName: string, method: string): string {
    const endpoint = method === "GET" ? "/api/data" : "/api/endpoint";

    return `✅ **Uso del hook:**
\`\`\`tsx
import ${hookName} from './hooks/${hookName}';

function MyComponent() {
  const { data, loading, error, refetch } = ${hookName}('${endpoint}');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
}
\`\`\``;
  }
}
