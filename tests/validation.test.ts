import { describe, expect, it } from "vitest";
import { idSchema, consultationMessageSchema } from "../lib/validation";

describe("validation", () => {
  it("accepts positive integer ids", () => {
    expect(idSchema.parse("12")).toBe(12);
  });

  it("rejects invalid ids", () => {
    expect(() => idSchema.parse("0")).toThrow();
  });

  it("validates consultation messages", () => {
    expect(
      consultationMessageSchema.parse({
        consultationId: 4,
        message: "Bonjour AstroConsu",
      }).message
    ).toBe("Bonjour AstroConsu");
  });
});
