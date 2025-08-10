import { AngularComponentArgs, MCPResponse } from "../utils/types.js";

export class AngularGenerator {
  static generateComponent(args: AngularComponentArgs): MCPResponse {
    const { name, inlineTemplate = false, inlineStyle = false, skipTests = false } = args;

    const componentName = name.charAt(0).toUpperCase() + name.slice(1);
    const selector = `${name.toLowerCase()}-component`;
    const className = `${componentName}Component`;

    const template = inlineTemplate
      ? `template: ` +
        "`" +
        `
    <p>${name} works!</p>
  ` +
        "`" +
        `,
`
      : `templateUrl: './${name.toLowerCase()}.component.html',
`;

    const style = inlineStyle
      ? `styles: [` +
        "`" +
        `
    p { color: red; }
  ` +
        "`" +
        `]
`
      : `styleUrls: ['./${name.toLowerCase()}.component.css']
`;

    const componentCode = `import { Component, OnInit } from '@angular/core';

@Component({
  selector: '${selector}',
  ${template}  ${style}})
export class ${className} implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
`;

    const htmlTemplate = inlineTemplate ? "" : `<p>${name} works!</p>\n`;
    const cssStyle = inlineStyle ? "" : `p { color: red; }\n`;
    const specFile = skipTests ? "" : this.generateSpecFile(name, className);

    let result =
      `📁 **${name.toLowerCase()}.component.ts**\n` +
      "`" +
      "`" +
      "`" +
      `typescript\n${componentCode}\n` +
      "`" +
      "`" +
      "`";

    if (!inlineTemplate) {
      result +=
        `\n\n📁 **${name.toLowerCase()}.component.html**\n` +
        "`" +
        "`" +
        "`" +
        `html\n${htmlTemplate}\n` +
        "`" +
        "`" +
        "`";
    }

    if (!inlineStyle) {
      result +=
        `\n\n📁 **${name.toLowerCase()}.component.css**\n` +
        "`" +
        "`" +
        "`" +
        `css\n${cssStyle}\n` +
        "`" +
        "`" +
        "`";
    }

    if (!skipTests) {
      result +=
        `\n\n📁 **${name.toLowerCase()}.component.spec.ts**\n` +
        "`" +
        "`" +
        "`" +
        `typescript\n${specFile}\n` +
        "`" +
        "`" +
        "`";
    }

    result += this.generateUsageExample(selector, className);

    return {
      content: [{ type: "text", text: result }],
    };
  }

  private static generateSpecFile(name: string, className: string): string {
    return `import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ${className} } from './${name.toLowerCase()}.component';

describe('${className}', () => {
  let component: ${className};
  let fixture: ComponentFixture<${className}>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ${className} ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(${className});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
`;
  }

  private static generateUsageExample(selector: string, className: string): string {
    return (
      `\n\n✅ **Uso del componente:**\n` +
      "`" +
      "`" +
      "`" +
      `typescript\n// En tu módulo Angular (ej. app.module.ts)\nimport { ${className} } from './${selector}/${selector}.component';\n\n@NgModule({\n  declarations: [\n    ${className}\n  ],\n  // ...\n})\nexport class AppModule { }\n` +
      "`" +
      "`" +
      "`" +
      `\n\n` +
      "`" +
      "`" +
      "`" +
      `html\n<!-- En tu plantilla (ej. app.component.html) -->\n<${selector}></${selector}>\n` +
      "`" +
      "`" +
      "`"
    );
  }
}
