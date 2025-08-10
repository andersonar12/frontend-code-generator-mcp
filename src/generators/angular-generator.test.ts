import { describe, it, expect } from 'vitest';
import { AngularGenerator } from './angular-generator.js';

describe('AngularGenerator', () => {
  it("should generate a basic Angular component", () => {
    const args = {
      name: "my-angular-component",
      inlineTemplate: false,
      inlineStyle: false,
      skipTests: false,
    };
    const result = AngularGenerator.generateComponent(args);
    expect(result.content[0].text).toContain("import { Component, OnInit } from '@angular/core';");
    expect(result.content[0].text).toContain("selector: 'my-angular-component-component',");
    expect(result.content[0].text).toContain(
      "templateUrl: './my-angular-component.component.html',"
    );
    expect(result.content[0].text).toContain("styleUrls: ['./my-angular-component.component.css']");
    expect(result.content[0].text).toContain(
      "export class MyAngularComponentComponent implements OnInit {"
    );
    expect(result.content[0].text).toContain("📁 **my-angular-component.component.html**");
    expect(result.content[0].text).toContain("📁 **my-angular-component.component.css**");
    expect(result.content[0].text).toContain("📁 **my-angular-component.component.spec.ts**");
  });

  it("should generate an Angular component with inline template and style", () => {
    const args = {
      name: "inline-component",
      inlineTemplate: true,
      inlineStyle: true,
      skipTests: true,
    };
    const result = AngularGenerator.generateComponent(args);
    expect(result.content[0].text).toContain(
      "template: `\n    <p>inline-component works!</p>\n  `,"
    );
    expect(result.content[0].text).toContain("styles: [`\n    p { color: red; }\n  `]");
    expect(result.content[0].text).not.toContain("templateUrl:");
    expect(result.content[0].text).not.toContain("styleUrls:");
    expect(result.content[0].text).not.toContain("📁 **inline-component.component.html**");
    expect(result.content[0].text).not.toContain("📁 **inline-component.component.css**");
    expect(result.content[0].text).not.toContain("📁 **inline-component.component.spec.ts**");
  });
});
