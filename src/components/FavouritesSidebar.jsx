import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import { useState } from "react";

function FavouritesSidebar({ propertiesById }) {
  const { favouriteIds, addFavourite, removeFavourite, clearFavourites } =
    useFavourites();

  // UI state: highlight sidebar when a draggable item is over it
  const [isDragOver, setIsDragOver] = useState(false);

  // Convert favourite IDs -> real property objects
  const favourites = favouriteIds
    .map((id) => propertiesById[id])
    .filter(Boolean);

  function handleDragOver(e) {
    e.preventDefault(); // required to allow dropping
    setIsDragOver(true);
  }

  function handleDragLeave() {
    setIsDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);

    // We store the property id as text/plain during dragStart
    const droppedId = e.dataTransfer.getData("text/plain");
    if (droppedId) addFavourite(droppedId); // duplicates prevented by context
  }

  return (
    <aside
      className={`panel favDropZone ${isDragOver ? "isDragOver" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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
          Drag a property here or press ♡.
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
                type="button"
                className="favIconBtn"
                onClick={() => removeFavourite(p.id)}
                aria-label="Remove from favourites"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

export default FavouritesSidebar;
