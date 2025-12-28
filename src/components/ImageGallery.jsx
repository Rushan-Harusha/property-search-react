import { useMemo, useState } from "react";

function ImageGallery({ images = [], altText = "Property photo" }) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeSrc = safeImages[activeIndex]
    ? `${import.meta.env.BASE_URL}${safeImages[activeIndex]}`
    : "";

  function openModal() {
    if (safeImages.length === 0) return;
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="gallery">
      <div className="galleryMain">
        {activeSrc ? (
          <button
            type="button"
            className="galleryMainBtn"
            onClick={openModal}
            aria-label="View all photos"
          >
            <img className="galleryMainImg" src={activeSrc} alt={altText} />
            <span className="galleryViewAll">View all photos</span>
          </button>
        ) : (
          <div className="galleryEmpty">No photos available</div>
        )}
      </div>

      <div className="galleryThumbs">
        {safeImages.map((img, idx) => {
          const thumbSrc = `${import.meta.env.BASE_URL}${img}`;
          const isActive = idx === activeIndex;

          return (
            <button
              key={`${img}-${idx}`}
              type="button"
              className={`galleryThumbBtn ${isActive ? "isActive" : ""}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View photo ${idx + 1}`}
            >
              <img className="galleryThumbImg" src={thumbSrc} alt="" />
            </button>
          );
        })}
      </div>

      {isModalOpen ? (
        <div className="modalOverlay" onClick={closeModal} role="presentation">
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modalHeader">
              <div className="modalTitle">
                Photos ({activeIndex + 1}/{safeImages.length})
              </div>
              <button type="button" className="modalClose" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="modalBody">
              <button
                type="button"
                className="modalNav"
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === 0 ? safeImages.length - 1 : prev - 1
                  )
                }
              >
                ‹
              </button>

              <img className="modalImg" src={activeSrc} alt={altText} />

              <button
                type="button"
                className="modalNav"
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === safeImages.length - 1 ? 0 : prev + 1
                  )
                }
              >
                ›
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ImageGallery;
