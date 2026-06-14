import { describe, test, expect } from "vitest";
import { isoToDotDate } from "./dateFormatter";

describe("isoToDotDate utility function", () => {
  test("should format UTC ISO date string to JST dot date format (morning)", () => {
    // 2026-06-08T00:00:00Z is 2026/06/08 09:00:00 in JST
    expect(isoToDotDate("2026-06-08T00:00:00.000Z")).toBe("2026.06.08");
  });

  test("should format UTC ISO date string to JST dot date format, respecting JST timezone shift (evening)", () => {
    // 2026-06-08T15:00:00Z is 2026/06/09 00:00:00 in JST
    expect(isoToDotDate("2026-06-08T15:00:00.000Z")).toBe("2026.06.09");
  });
});
