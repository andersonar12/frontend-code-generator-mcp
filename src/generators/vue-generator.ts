import { VueComponentArgs, MCPResponse } from "../utils/types.js";

export class VueGenerator {
  static generateComponent(args: VueComponentArgs): MCPResponse {
    const { name, composition = true, typescript = true } = args;

    const component = this.generateComponentCode(name, composition, typescript);
    const result = this.formatOutput(name, component);

    return {
      content: [{ type: "text", text: result }],
    };
  }

  private static generateComponentCode(
    name: string,
    composition: boolean,
    typescript: boolean
  ): string {
    const scriptLang = typescript ? ' lang="ts"' : "";
    const setupAttr = composition ? " setup" : "";

    const template = this.generateTemplate(name);
    const script = this.generateScript(name, composition, scriptLang, setupAttr);
    const styles = this.generateStyles(name);

    return `${template}\n\n${script}\n\n${styles}`;
  }

  private static generateTemplate(name: string): string {
    return `<template>
  <div class="${name.toLowerCase()}">
    <h2 class="${name.toLowerCase()}__title">{{ title }}</h2>
    <p>{{ message }}</p>
    <button @click="handleClick" class="${name.toLowerCase()}__button">
      Click me
    </button>
  </div>
</template>`;
  }

  private static generateScript(
    name: string,
    composition: boolean,
    scriptLang: string,
    setupAttr: string
  ): string {
    const scriptContent = composition
      ? this.generateCompositionScript(name)
      : this.generateOptionsScript(name);

    return `<script${scriptLang}${setupAttr}>
${scriptContent}
</script>`;
  }

  private static generateCompositionScript(name: string): string {
    return `import { ref } from 'vue';

const title = ref('${name}');
const message = ref('¡Hola desde ${name}!');

const handleClick = () => {
  message.value = 'Button clicked!';
};`;
  }

  private static generateOptionsScript(name: string): string {
    return `export default {
  name: '${name}',
  data() {
    return {
      title: '${name}',
      message: '¡Hola desde ${name}!'
    };
  },
  methods: {
    handleClick() {
      this.message = 'Button clicked!';
    }
  }
};`;
  }

  private static generateStyles(name: string): string {
    return `<style scoped>
.${name.toLowerCase()} {
  padding: 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.${name.toLowerCase()}__title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.${name.toLowerCase()}__button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.${name.toLowerCase()}__button:hover {
  background-color: #0056b3;
}
</style>`;
  }

  private static formatOutput(name: string, component: string): string {
    const usage = `✅ **Uso del componente:**\n\`\`\`vue\nimport ${name} from './${name}.vue';\n\n// En tu template\n<${name} />\n\`\`\``;

    return `📁 **${name}.vue**\n\`\`\`vue\n${component}\n\`\`\`\n\n${usage}`;
  }
}
