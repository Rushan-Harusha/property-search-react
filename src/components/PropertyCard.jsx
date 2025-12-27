function PropertyCard({ property }) {
  const { type, price, location, bedrooms, description, picture } = property;

  // Convert description that may contain <br> into plain text preview
  const previewText = String(description)
    .replaceAll("<br>", " ")
    .replaceAll("<br/>", " ")
    .replaceAll("<br />", " ")
    .trim();

  return (
    <article
      style={{
        background: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ height: "160px", background: "#ddd" }}>
        {picture ? (
          <img
            src={picture}
            alt={`${type} in ${location}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
        ) : null}
      </div>

      <div style={{ padding: "12px" }}>
        <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>
          £{Number(price).toLocaleString()}
        </div>

        <div style={{ fontWeight: 600 }}>
          {bedrooms} bed {type}
        </div>

        <div style={{ color: "#555", margin: "4px 0 10px" }}>{location}</div>

        <p style={{ color: "#333", lineHeight: 1.4 }}>
          {previewText.length > 110
            ? previewText.slice(0, 110) + "…"
            : previewText}
        </p>
      </div>
    </article>
  );
}

export default PropertyCard;
