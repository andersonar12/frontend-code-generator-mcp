import { describe, it, expect } from "vitest";
import { CSSGenerator } from "../src/generators/css-generator";

describe("CSSGenerator", () => {
  it("should generate flexbox utilities", () => {
    const args = { type: "flexbox" };
    const result = CSSGenerator.generateUtilities(args);
    expect(result.content[0].text).toContain(".flex { display: flex; }");
    expect(result.content[0].text).toContain(".items-center { align-items: center; }");
  });

  it("should generate grid utilities", () => {
    const args = { type: "grid" };
    const result = CSSGenerator.generateUtilities(args);
    expect(result.content[0].text).toContain(".grid { display: grid; }");
    expect(result.content[0].text).toContain(
      ".grid-cols-3 { grid-template-columns: repeat(3, 1fr); }"
    );
  });

  it("should generate button utilities", () => {
    const args = { type: "buttons" };
    const result = CSSGenerator.generateUtilities(args);
    expect(result.content[0].text).toContain(".btn {");
    expect(result.content[0].text).toContain(".btn-primary {");
  });

  it("should generate card utilities", () => {
    const args = { type: "cards" };
    const result = CSSGenerator.generateUtilities(args);
    expect(result.content[0].text).toContain(".card {");
    expect(result.content[0].text).toContain(".card-header {");
  });
});
