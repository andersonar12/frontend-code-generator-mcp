import { describe, it, expect } from 'vitest';
import { VueGenerator } from './vue-generator.js';

describe("VueGenerator", () => {
  it("should generate a basic Vue component", () => {
    const args = { name: "MyVueComponent", composition: false, typescript: false };
    const result = VueGenerator.generateComponent(args);
    expect(result.content[0].text).toContain("<template>");
    expect(result.content[0].text).toContain("<div>MyVueComponent componente generado</div>");
    expect(result.content[0].text).toContain("<script>");
    expect(result.content[0].text).toContain("name: 'MyVueComponent',");
  });

  it("should generate a Vue component with Composition API and TypeScript", () => {
    const args = { name: "MyCompositionVueComponent", composition: true, typescript: true };
    const result = VueGenerator.generateComponent(args);
    expect(result.content[0].text).toContain('<script setup lang="ts">');
    expect(result.content[0].text).toContain("import { ref } from 'vue';");
  });
});
