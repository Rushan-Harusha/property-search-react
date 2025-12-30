import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

function PropertyCard({ property }) {
  const { id, type, price, location, bedrooms, description, picture } =
    property;

  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const fav = isFavourite(id);

  // Convert any <br> tags in JSON into plain text for the card preview
  const previewText = String(description)
    .replaceAll("<br>", " ")
    .replaceAll("<br/>", " ")
    .replaceAll("<br />", " ")
    .trim();

  // Make image path work on nested routes + GitHub Pages (uses Vite base URL)
  const imgSrc = picture ? `${import.meta.env.BASE_URL}${picture}` : "";

  function toggleFavourite(e) {
    e.preventDefault(); // stop Link navigation
    e.stopPropagation(); // extra safety: don't trigger parent clicks

    if (fav) removeFavourite(id);
    else addFavourite(id);
  }

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

          {/* Favourite button (does NOT navigate) */}
          <button
            type="button"
            className={`favBtn ${fav ? "isFav" : ""}`}
            onClick={toggleFavourite}
            aria-label={fav ? "Remove from favourites" : "Add to favourites"}
            title={fav ? "Remove from favourites" : "Add to favourites"}
          >
            {fav ? "♥" : "♡"}
          </button>
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
