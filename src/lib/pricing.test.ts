import { describe, expect, it } from "vitest";
import { shippingFor, formatBDT } from "./pricing";

describe("shipping", () => {
  it("is free at ৳3,000 or more", () => expect(shippingFor(3000)).toBe(0));
  it("charges ৳120 below ৳3,000", () => expect(shippingFor(2999)).toBe(120));
  it("formats BDT", () => expect(formatBDT(12490)).toBe("৳12,490"));
});
