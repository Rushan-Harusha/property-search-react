import { Link, useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";

function PropertyPage() {
  const { id } = useParams();
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

  const { type, price, location, bedrooms, tenure, description, picture } =
    property;

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
          {picture ? (
            <img
              className="detailsImage"
              src={picture}
              alt={`${type} in ${location}`}
            />
          ) : null}
        </div>

        <div className="detailsSummary">
          <div className="detailsPrice">£{Number(price).toLocaleString()}</div>
          <div className="detailsMeta">
            {bedrooms} bed {type} • {tenure}
          </div>
          <div className="detailsLocation">{location}</div>

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
