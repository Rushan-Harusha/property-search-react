import { useMemo, useState } from "react";
import propertiesData from "../data/properties.json";
import PropertyCard from "../components/PropertyCard";
import { filterProperties } from "../utils/filterProperties";

function SearchPage() {
  const properties = propertiesData.properties;

  // What the user is currently editing
  const [formState, setFormState] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    locationText: "",
  });

  // What is actually applied to results (Rightmove-like)
  const [appliedCriteria, setAppliedCriteria] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSearch(e) {
    e.preventDefault();
    setAppliedCriteria({ ...formState });
  }

  function clearFilters() {
    const cleared = {
      type: "",
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
      locationText: "",
    };
    setFormState(cleared);
    setAppliedCriteria(null); // back to "not searched"
  }

  const typeOptions = useMemo(() => {
    const unique = new Set(properties.map((p) => p.type));
    return ["", ...Array.from(unique)];
  }, [properties]);

  const filtered = useMemo(() => {
    if (!appliedCriteria) return [];
    return filterProperties(properties, appliedCriteria);
  }, [properties, appliedCriteria]);

  const hasSearched = appliedCriteria !== null;

  return (
    <main style={{ padding: "16px" }}>
      <h1 style={{ marginBottom: "12px" }}>Property Search</h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        style={{
          background: "#fff",
          padding: "12px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          marginBottom: "12px",
        }}
      >
        <h2 style={{ fontSize: "16px", marginBottom: "10px" }}>Search</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "10px",
            alignItems: "end",
          }}
        >
          <label>
            <div style={{ fontSize: "13px", marginBottom: "4px" }}>
              Property type
            </div>
            <select
              name="type"
              value={formState.type}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            >
              {typeOptions.map((t) => (
                <option key={t || "all"} value={t}>
                  {t === "" ? "Any" : t}
                </option>
              ))}
            </select>
          </label>

          <label>
            <div style={{ fontSize: "13px", marginBottom: "4px" }}>
              Min price (£)
            </div>
            <input
              name="minPrice"
              value={formState.minPrice}
              onChange={handleChange}
              inputMode="numeric"
              placeholder="e.g. 200000"
              style={{ width: "100%", padding: "8px" }}
            />
          </label>

          <label>
            <div style={{ fontSize: "13px", marginBottom: "4px" }}>
              Max price (£)
            </div>
            <input
              name="maxPrice"
              value={formState.maxPrice}
              onChange={handleChange}
              inputMode="numeric"
              placeholder="e.g. 750000"
              style={{ width: "100%", padding: "8px" }}
            />
          </label>

          <label>
            <div style={{ fontSize: "13px", marginBottom: "4px" }}>
              Min bedrooms
            </div>
            <select
              name="minBedrooms"
              value={formState.minBedrooms}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </label>

          <label>
            <div style={{ fontSize: "13px", marginBottom: "4px" }}>
              Location contains
            </div>
            <input
              name="locationText"
              value={formState.locationText}
              onChange={handleChange}
              placeholder="e.g. BR5"
              style={{ width: "100%", padding: "8px" }}
            />
          </label>

          <button
            type="submit"
            style={{
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #2dbf9c",
              background: "#2dbf9c",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Search properties
          </button>

          <button
            type="button"
            onClick={clearFilters}
            style={{
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              background: "#f7f7f7",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>

        <div style={{ marginTop: "10px", fontSize: "13px", color: "#555" }}>
          {!hasSearched ? (
            <>
              Enter criteria and click <b>Search properties</b>.
            </>
          ) : (
            <>
              Showing <b>{filtered.length}</b> of <b>{properties.length}</b>{" "}
              properties
            </>
          )}
        </div>
      </form>

      {/* Results */}
      {!hasSearched ? (
        <p style={{ color: "#555" }}>
          No results yet. Use the search form above.
        </p>
      ) : (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "12px",
          }}
        >
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </section>
      )}
    </main>
  );
}

export default SearchPage;
