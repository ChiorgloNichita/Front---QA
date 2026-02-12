import { describe, it, expect } from "vitest";
import { pluralize } from "@/lib/pluralize";

describe("pluralize", () => {
  const one = "item";
  const few = "items-few";
  const many = "items-many";

  it("uses 'one' form for 1, 21, 31, etc.", () => {
    expect(pluralize(1, one, few, many)).toBe(one);
    expect(pluralize(21, one, few, many)).toBe(one);
    expect(pluralize(31, one, few, many)).toBe(one);
    expect(pluralize(101, one, few, many)).toBe(one);
  });

  it("uses 'few' form for 2-4, 22-24, etc.", () => {
    expect(pluralize(2, one, few, many)).toBe(few);
    expect(pluralize(3, one, few, many)).toBe(few);
    expect(pluralize(4, one, few, many)).toBe(few);
    expect(pluralize(22, one, few, many)).toBe(few);
    expect(pluralize(24, one, few, many)).toBe(few);
  });

  it("uses 'many' form for 0, 5-20, 25-30, etc.", () => {
    expect(pluralize(0, one, few, many)).toBe(many);
    expect(pluralize(5, one, few, many)).toBe(many);
    expect(pluralize(10, one, few, many)).toBe(many);
    expect(pluralize(11, one, few, many)).toBe(many);
    expect(pluralize(12, one, few, many)).toBe(many);
    expect(pluralize(15, one, few, many)).toBe(many);
    expect(pluralize(19, one, few, many)).toBe(many);
    expect(pluralize(20, one, few, many)).toBe(many);
    expect(pluralize(25, one, few, many)).toBe(many);
  });
});
