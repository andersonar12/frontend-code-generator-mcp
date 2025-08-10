import { describe, it, expect } from "vitest";
import { SvelteGenerator } from "../src/generators/svelte-generator";

describe("SvelteGenerator", () => {
  it("should generate a basic Svelte component", () => {
    const args = { name: "MySvelteComponent", typescript: false, cssPreProcessor: "none" };
    const result = SvelteGenerator.generateComponent(args);
    expect(result.content[0].text).toContain("<script>");
    expect(result.content[0].text).toContain("<style>");
    expect(result.content[0].text).toContain("<h1>Hello MySvelteComponent!</h1>");
  });

  it("should generate a Svelte component with TypeScript", () => {
    const args = { name: "MyTsSvelteComponent", typescript: true, cssPreProcessor: "none" };
    const result = SvelteGenerator.generateComponent(args);
    expect(result.content[0].text).toContain('<script lang="ts">');
  });

  it("should generate a Svelte component with SCSS", () => {
    const args = { name: "MyScssSvelteComponent", typescript: false, cssPreProcessor: "scss" };
    const result = SvelteGenerator.generateComponent(args);
    expect(result.content[0].text).toContain('<style lang="scss">');
  });
});
