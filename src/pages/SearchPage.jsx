import { useMemo, useState } from "react";
import propertiesData from "../data/properties.json";
import PropertyCard from "../components/PropertyCard";
import { filterProperties } from "../utils/filterProperties";

function SearchPage() {
  const properties = propertiesData.properties;

  const [formState, setFormState] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    locationText: "",
  });

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
    setAppliedCriteria(null);
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
    <main className="page">
      <h1 className="pageTitle">Property Search</h1>

      <form className="panel" onSubmit={handleSearch}>
        <h2 className="panelTitle">Search</h2>

        <div className="searchGrid">
          <label className="field">
            <span className="fieldLabel">Property type</span>
            <select
              className="control"
              name="type"
              value={formState.type}
              onChange={handleChange}
            >
              {typeOptions.map((t) => (
                <option key={t || "all"} value={t}>
                  {t === "" ? "Any" : t}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="fieldLabel">Min price (£)</span>
            <input
              className="control"
              name="minPrice"
              value={formState.minPrice}
              onChange={handleChange}
              inputMode="numeric"
              placeholder="e.g. 200000"
            />
          </label>

          <label className="field">
            <span className="fieldLabel">Max price (£)</span>
            <input
              className="control"
              name="maxPrice"
              value={formState.maxPrice}
              onChange={handleChange}
              inputMode="numeric"
              placeholder="e.g. 750000"
            />
          </label>

          <label className="field">
            <span className="fieldLabel">Min bedrooms</span>
            <select
              className="control"
              name="minBedrooms"
              value={formState.minBedrooms}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </label>

          <label className="field">
            <span className="fieldLabel">Location contains</span>
            <input
              className="control"
              name="locationText"
              value={formState.locationText}
              onChange={handleChange}
              placeholder="e.g. BR5"
            />
          </label>

          <button className="btn btnPrimary" type="submit">
            Search properties
          </button>

          <button className="btn btnGhost" type="button" onClick={clearFilters}>
            Clear
          </button>
        </div>

        <div className="resultsMeta">
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

      {!hasSearched ? (
        <p className="mutedText">No results yet. Use the search form above.</p>
      ) : (
        <section className="resultsGrid">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </section>
      )}
    </main>
  );
}

export default SearchPage;
