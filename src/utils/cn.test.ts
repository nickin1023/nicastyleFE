import { describe, test, expect } from "vitest";
import { cn } from "./cn";

describe("cn utility function", () => {
  test("should return the class name when a string is passed", () => {
    expect(cn("bg-red-500")).toBe("bg-red-500");
  });

  test("should handle empty string", () => {
    expect(cn("")).toBe("");
  });
});
