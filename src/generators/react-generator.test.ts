import { describe, it, expect } from 'vitest';
import { ReactGenerator } from './react-generator.js';

describe('ReactGenerator', () => {
  it("should generate a basic React component", () => {
    const args = { name: "MyComponent", typescript: false, styled: false };
    const result = ReactGenerator.generateComponent(args);
    expect(result.content[0].text).toContain("import React from 'react';");
    expect(result.content[0].text).toContain("const MyComponent = () => {");
    expect(result.content[0].text).toContain("<div>MyComponent</div>");
  });

  it("should generate a React component with TypeScript", () => {
    const args = { name: "MyTsComponent", typescript: true, styled: false };
    const result = ReactGenerator.generateComponent(args);
    expect(result.content[0].text).toContain("interface MyTsComponentProps {");
  });

  it("should generate a React component with props", () => {
    const args = {
      name: "MyPropsComponent",
      props: ["prop1", "prop2"],
      typescript: true,
      styled: false,
    };
    const result = ReactGenerator.generateComponent(args);
    expect(result.content[0].text).toContain("{ prop1, prop2 }: MyPropsComponentProps");
    expect(result.content[0].text).toContain("<p>{prop1}</p>");
    expect(result.content[0].text).toContain("<p>{prop2}</p>");
  });

  it("should generate a React component with styles", () => {
    const args = { name: "MyStyledComponent", styled: true };
    const result = ReactGenerator.generateComponent(args);
    expect(result.content[0].text).toContain("import './MyStyledComponent.css';");
    expect(result.content[0].text).toContain(".mystyledcomponent {");
  });
});
