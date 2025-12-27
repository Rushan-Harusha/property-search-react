/**
 * Filters properties based on the given criteria.
 * All criteria are optional. If a criterion is empty, it is ignored.
 */
export function filterProperties(properties, criteria) {
  const {
    type = "",
    minPrice = "",
    maxPrice = "",
    minBedrooms = "",
    locationText = "",
  } = criteria;

  const typeLower = type.trim().toLowerCase();
  const locLower = locationText.trim().toLowerCase();

  const minP = minPrice === "" ? null : Number(minPrice);
  const maxP = maxPrice === "" ? null : Number(maxPrice);
  const minBeds = minBedrooms === "" ? null : Number(minBedrooms);

  return properties.filter((p) => {
    // Type
    if (typeLower && String(p.type).toLowerCase() !== typeLower) return false;

    // Min price / max price
    const price = Number(p.price);
    if (minP !== null && price < minP) return false;
    if (maxP !== null && price > maxP) return false;

    // Bedrooms
    const beds = Number(p.bedrooms);
    if (minBeds !== null && beds < minBeds) return false;

    // Location search (matches partial text)
    if (locLower) {
      const haystack = `${p.location ?? ""}`.toLowerCase();
      if (!haystack.includes(locLower)) return false;
    }

    return true;
  });
}
