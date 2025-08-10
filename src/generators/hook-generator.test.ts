import { describe, it, expect } from "vitest";
import { HookGenerator } from "../src/generators/hook-generator";

describe("HookGenerator", () => {
  it("should generate a basic GET API hook", () => {
    const args = { name: "fetchUsers", method: "GET" };
    const result = HookGenerator.generateAPIHook(args);
    expect(result.content[0].text).toContain("import { useState, useEffect } from 'react';");
    expect(result.content[0].text).toContain(
      "const useFetchUsers = (url: string): UseFetchUsersResult => {"
    );
    expect(result.content[0].text).toContain("method: 'GET',");
  });

  it("should generate a POST API hook", () => {
    const args = { name: "postData", method: "POST" };
    const result = HookGenerator.generateAPIHook(args);
    expect(result.content[0].text).toContain(
      "const usePostData = (url: string, payload?: any): UsePostDataResult => {"
    );
    expect(result.content[0].text).toContain("method: 'POST',");
    expect(result.content[0].text).toContain("body: JSON.stringify(payload),");
  });
});
