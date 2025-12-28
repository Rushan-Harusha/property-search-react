function PropertyCard({ property }) {
  const { type, price, location, bedrooms, description, picture } = property;

  const previewText = String(description)
    .replaceAll("<br>", " ")
    .replaceAll("<br/>", " ")
    .replaceAll("<br />", " ")
    .trim();

  return (
    <article className="card">
      <div className="cardImageWrap">
        {picture ? (
          <img
            className="cardImage"
            src={picture}
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
  );
}

export default PropertyCard;
