import { Link, useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import ImageGallery from "../components/ImageGallery";

function PropertyPage() {
  const { id } = useParams();

  // Find the property matching the route param
  const property = propertiesData.properties.find((p) => p.id === id);

  if (!property) {
    return (
      <main className="page">
        <h1 className="pageTitle">Property not found</h1>
        <Link className="backLink" to="/">
          ← Back to search
        </Link>
      </main>
    );
  }

  const { type, price, location, bedrooms, tenure, description } = property;

  // Split description safely (prevents XSS: we do NOT render raw HTML)
  // Works with text that contains <br> tags from the JSON
  const safeParagraphs = String(description)
    .split(/<br\s*\/?>/i)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <main className="page">
      <Link className="backLink" to="/">
        ← Back to search
      </Link>

      <section className="detailsHeader">
        <div className="detailsImageWrap">
          {/* Use images array for the gallery; fallback to picture if needed */}
          <ImageGallery
            images={property.images ?? [property.picture].filter(Boolean)}
            altText={`${type} in ${location}`}
          />
        </div>

        <div className="detailsSummary">
          <div className="detailsPrice">£{Number(price).toLocaleString()}</div>
          <div className="detailsMeta">
            {bedrooms} bed {type} • {tenure}
          </div>
          <div className="detailsLocation">{location}</div>

          {/* Short preview on the side (full text will go in Tabs later) */}
          <div className="detailsShort">
            {safeParagraphs.slice(0, 2).map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default PropertyPage;
