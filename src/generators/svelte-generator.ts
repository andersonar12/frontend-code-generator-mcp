import { SvelteComponentArgs, MCPResponse } from "../utils/types.js";

export class SvelteGenerator {
  static generateComponent(args: SvelteComponentArgs): MCPResponse {
    const { name, typescript = false, cssPreProcessor = "none" } = args;

    const scriptLang = typescript ? ` lang="ts"` : "";
    const styleLang = cssPreProcessor !== "none" ? ` lang="${cssPreProcessor}"` : "";

    const componentCode = `
<script${scriptLang}>
  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<style${styleLang}>
  button {
    background-color: #ff3e00;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
</style>

<div>
  <h1>Hello ${name}!</h1>
  <button on:click={handleClick}>Clicks: {count}</button>
</div>
`;

    const result =
      `📁 **${name}.svelte**\n` +
      "```" +
      `svelte\n${componentCode}\n` +
      "```" +
      `\n\n` +
      this.generateUsageExample(name);

    return {
      content: [{ type: "text", text: result }],
    };
  }

  private static generateUsageExample(name: string): string {
    return (
      `✅ **Uso del componente:**\n` +
      "```" +
      `html\n<script>\n  import ${name} from './${name}.svelte';\n</script>\n\n<${name} />\n` +
      "```"
    );
  }
}
