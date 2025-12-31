import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import { useState } from "react";

function FavouritesSidebar({ propertiesById }) {
  const { favouriteIds, addFavourite, removeFavourite, clearFavourites } =
    useFavourites();

  // Highlight when dragging over the ADD zone
  const [isAddDragOver, setIsAddDragOver] = useState(false);
  // Highlight when dragging over the REMOVE zone
  const [isRemoveDragOver, setIsRemoveDragOver] = useState(false);

  const favourites = favouriteIds
    .map((id) => propertiesById[id])
    .filter(Boolean);

  // ----- ADD (drop into sidebar) -----
  function handleAddDragOver(e) {
    e.preventDefault(); // allow drop
    setIsAddDragOver(true);
  }
  function handleAddDragLeave() {
    setIsAddDragOver(false);
  }
  function handleAddDrop(e) {
    e.preventDefault();
    setIsAddDragOver(false);

    const droppedId = e.dataTransfer.getData("text/plain");
    if (droppedId) addFavourite(droppedId); // duplicates prevented by context
  }

  // ----- REMOVE (drop into remove zone) -----
  function handleRemoveDragOver(e) {
    e.preventDefault(); // allow drop
    e.stopPropagation(); // IMPORTANT: don’t trigger the parent dropzone
    setIsRemoveDragOver(true);
  }

  function handleRemoveDragLeave(e) {
    e.stopPropagation();
    setIsRemoveDragOver(false);
  }

  function handleRemoveDrop(e) {
    e.preventDefault();
    e.stopPropagation(); // IMPORTANT: stop parent <aside onDrop> from running
    setIsRemoveDragOver(false);

    const droppedId = e.dataTransfer.getData("text/plain");
    if (droppedId) removeFavourite(droppedId);
  }

  return (
    <aside
      className={`panel favDropZone ${isAddDragOver ? "isDragOver" : ""}`}
      onDragOver={handleAddDragOver}
      onDragLeave={handleAddDragLeave}
      onDrop={handleAddDrop}
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

      {/* REMOVE ZONE (drag favourites here to remove) */}
      <div
        className={`favRemoveZone ${isRemoveDragOver ? "isDragOver" : ""}`}
        onDragOver={handleRemoveDragOver}
        onDragLeave={handleRemoveDragLeave}
        onDrop={handleRemoveDrop}
      >
        Drop here to remove
      </div>

      {favourites.length === 0 ? (
        <p className="mutedText" style={{ marginTop: 10 }}>
          Drag a property here or press ♡.
        </p>
      ) : (
        <div className="favList">
          {favourites.map((p) => (
            <div
              key={p.id}
              className="favItem"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", p.id); // send id for removal drop zone
                e.dataTransfer.effectAllowed = "move";
              }}
              title="Drag to remove zone"
            >
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
