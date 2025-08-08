import { ReactComponentArgs, MCPResponse } from "../utils/types.js";

export class ReactGenerator {
  static generateComponent(args: ReactComponentArgs): MCPResponse {
    const { name, props = [], typescript = true, styled = true } = args;

    const propsInterface =
      typescript && props.length > 0
        ? `interface ${name}Props {\n${props.map((prop) => `  ${prop}: any;`).join("\n")}\n}\n\n`
        : "";

    const propsParam =
      props.length > 0 ? `{ ${props.join(", ")} }${typescript ? `: ${name}Props` : ""}` : "";

    const component = this.generateComponentCode(
      name,
      propsInterface,
      propsParam,
      typescript,
      styled,
      props
    );
    const styles = styled ? this.generateStyles(name) : "";

    let result = this.formatComponentOutput(name, component, typescript);

    if (styled) {
      result += this.formatStylesOutput(name, styles);
    }

    result += this.generateUsageExample(name, props, typescript);

    return {
      content: [{ type: "text", text: result }],
    };
  }

  private static generateComponentCode(
    name: string,
    propsInterface: string,
    propsParam: string,
    typescript: boolean,
    styled: boolean,
    props: string[]
  ): string {
    const importReact = "import React from 'react';";
    const importStyles = styled ? `import './${name}.css';` : "";

    return `${importReact}
${importStyles}

${propsInterface}const ${name} = (${propsParam}) => {
  return (
    <div className="${name.toLowerCase()}">
      <h2 className="${name.toLowerCase()}__title">${name}</h2>
      {/* Agrega tu contenido aquí */}
      ${props.map((prop) => `<p>{${prop}}</p>`).join("\n      ")}
    </div>
  );
};

export default ${name};`;
  }

  private static generateStyles(name: string): string {
    return `
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
}`;
  }

  private static formatComponentOutput(
    name: string,
    component: string,
    typescript: boolean
  ): string {
    const extension = typescript ? "tsx" : "jsx";
    return `📁 **${name}.${extension}**\n\`\`\`${extension}\n${component}\n\`\`\``;
  }

  private static formatStylesOutput(name: string, styles: string): string {
    return `\n\n📁 **${name}.css**\n\`\`\`css${styles}\n\`\`\``;
  }

  private static generateUsageExample(name: string, props: string[], typescript: boolean): string {
    const extension = typescript ? "tsx" : "jsx";
    const propsExample = props.length > 0 ? ` ${props.map((p) => `${p}="valor"`).join(" ")}` : "";

    return `\n\n✅ **Uso del componente:**\n\`\`\`${extension}\nimport ${name} from './${name}';\n\n// En tu JSX\n<${name}${propsExample} />\n\`\`\``;
  }
}
