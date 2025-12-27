import propertiesData from "../data/properties.json";
import PropertyCard from "../components/PropertyCard";

function SearchPage() {
  const properties = propertiesData.properties;

  return (
    <main style={{ padding: "16px" }}>
      <h1 style={{ marginBottom: "12px" }}>Property Search</h1>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "12px",
        }}
      >
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </section>
    </main>
  );
}

export default SearchPage;
