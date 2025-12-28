import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  const { id, type, price, location, bedrooms, description, picture } =
    property;

  // Convert any <br> tags in JSON into plain text for the card preview
  const previewText = String(description)
    .replaceAll("<br>", " ")
    .replaceAll("<br/>", " ")
    .replaceAll("<br />", " ")
    .trim();

  // Make image path work on nested routes + GitHub Pages (uses Vite base URL)
  const imgSrc = picture ? `${import.meta.env.BASE_URL}${picture}` : "";

  return (
    <Link to={`/property/${id}`} className="cardLink">
      <article className="card">
        <div className="cardImageWrap">
          {picture ? (
            <img
              className="cardImage"
              src={imgSrc}
              alt={`${type} in ${location}`}
              loading="lazy"
            />
          ) : null}
        </div>

        <div className="cardBody">
          <div className="cardPrice">£{Number(price).toLocaleString()}</div>
          <div className="cardMeta">
            {bedrooms} bed {type}
          </div>
          <div className="cardLocation">{location}</div>

          <p className="cardDesc">
            {previewText.length > 110
              ? previewText.slice(0, 110) + "…"
              : previewText}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default PropertyCard;
