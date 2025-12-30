import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

function FavouritesSidebar({ propertiesById }) {
  const { favouriteIds, removeFavourite, clearFavourites } = useFavourites();

  // Convert favourite IDs -> real property objects
  const favourites = favouriteIds
    .map((id) => propertiesById[id])
    .filter(Boolean);

  return (
    <aside className="panel">
      <div className="favHeader">
        <h2 className="panelTitle" style={{ margin: 0 }}>
          Favourites ({favourites.length})
        </h2>

        <button
          className="btn btnGhost"
          type="button"
          onClick={clearFavourites}
          disabled={favourites.length === 0}
          title="Clear favourites"
        >
          Clear
        </button>
      </div>

      {favourites.length === 0 ? (
        <p className="mutedText" style={{ marginTop: 10 }}>
          No favourites yet.
        </p>
      ) : (
        <div className="favList">
          {favourites.map((p) => (
            <div key={p.id} className="favItem">
              <Link className="favLink" to={`/property/${p.id}`}>
                <div className="favPrice">
                  £{Number(p.price).toLocaleString()}
                </div>
                <div className="favMeta">
                  {p.bedrooms} bed {p.type}
                </div>
                <div className="favLocation">{p.location}</div>
              </Link>

              <button
                className="btn btnGhost favDelete"
                type="button"
                onClick={() => removeFavourite(p.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

export default FavouritesSidebar;
