import { describe, it, expect } from "vitest";
import { filterProperties } from "./filterProperties";

const properties = [
  {
    id: "prop1",
    type: "House",
    bedrooms: 3,
    price: 750000,
    location: "Petts Wood Road, Orpington BR5",
  },
  {
    id: "prop2",
    type: "Flat",
    bedrooms: 2,
    price: 399995,
    location: "Crofton Road Orpington BR6",
  },
  {
    id: "prop3",
    type: "Apartment",
    bedrooms: 1,
    price: 200000,
    location: "High Street, Bromley BR1",
  },
];

describe("filterProperties", () => {
  it("filters by property type", () => {
    const result = filterProperties(properties, { type: "Flat" });
    expect(result.map((p) => p.id)).toEqual(["prop2"]);
  });

  it("filters by min and max price", () => {
    const result = filterProperties(properties, {
      minPrice: "250000",
      maxPrice: "500000",
    });
    expect(result.map((p) => p.id)).toEqual(["prop2"]);
  });

  it("filters by minimum bedrooms", () => {
    const result = filterProperties(properties, { minBedrooms: "2" });
    expect(result.map((p) => p.id)).toEqual(["prop1", "prop2"]);
  });

  it("filters by location contains (case-insensitive)", () => {
    const result = filterProperties(properties, { locationText: "br5" });
    expect(result.map((p) => p.id)).toEqual(["prop1"]);
  });

  it("supports multiple criteria together", () => {
    const result = filterProperties(properties, {
      type: "House",
      minPrice: "700000",
      maxPrice: "800000",
      minBedrooms: "3",
      locationText: "orpington",
    });
    expect(result.map((p) => p.id)).toEqual(["prop1"]);
  });
});
