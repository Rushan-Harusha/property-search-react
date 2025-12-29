import { useMemo, useState } from "react";

function ImageGallery({ images = [], altText = "Property photo" }) {
  // Make sure we only keep valid image strings
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );

  // activeIndex = which image is currently selected (0..n-1)
  const [activeIndex, setActiveIndex] = useState(0);

  // isModalOpen = controls the "View all photos" lightbox
  const [isModalOpen, setIsModalOpen] = useState(false);

  // BASE_URL makes image paths work on nested routes + GitHub Pages
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

  // Wrap-around navigation (going back from first goes to last)
  function prev() {
    setActiveIndex((prevIdx) =>
      prevIdx === 0 ? safeImages.length - 1 : prevIdx - 1
    );
  }

  // Wrap-around navigation (going next from last goes to first)
  function next() {
    setActiveIndex((prevIdx) =>
      prevIdx === safeImages.length - 1 ? 0 : prevIdx + 1
    );
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

      {/* Thumbnails: clicking one changes the main image */}
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
              {/* alt is empty because the main image already has descriptive alt */}
              <img className="galleryThumbImg" src={thumbSrc} alt="" />
            </button>
          );
        })}
      </div>

      {/* Modal: click outside to close, inside stops propagation */}
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
              <button type="button" className="modalNav" onClick={prev}>
                ‹
              </button>

              <img className="modalImg" src={activeSrc} alt={altText} />

              <button type="button" className="modalNav" onClick={next}>
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
