/**
 * Filters properties based on the given criteria.
 * Empty criteria values are ignored.
 * Kept as a pure function so it’s easy to unit test with Jest later.
 */
export function filterProperties(properties, criteria) {
  const {
    type = "",
    minPrice = "",
    maxPrice = "",
    minBedrooms = "",
    locationText = "",
  } = criteria;

  // Normalize text inputs for comparisons
  const typeLower = type.trim().toLowerCase();
  const locLower = locationText.trim().toLowerCase();

  // Convert numeric inputs safely ("" means "not provided")
  const minP = minPrice === "" ? null : Number(minPrice);
  const maxP = maxPrice === "" ? null : Number(maxPrice);
  const minBeds = minBedrooms === "" ? null : Number(minBedrooms);

  return properties.filter((p) => {
    // Type filter (exact match)
    if (typeLower && String(p.type).toLowerCase() !== typeLower) return false;

    // Price range filter
    const price = Number(p.price);
    if (minP !== null && price < minP) return false;
    if (maxP !== null && price > maxP) return false;

    // Bedrooms filter (minimum)
    const beds = Number(p.bedrooms);
    if (minBeds !== null && beds < minBeds) return false;

    // Location partial match (postcode/area text)
    if (locLower) {
      const haystack = `${p.location ?? ""}`.toLowerCase();
      if (!haystack.includes(locLower)) return false;
    }

    return true;
  });
}
