import React, { useEffect, useState } from "react";
import { fetchGalleryImages } from "../../services/galleryApi";

const HotelGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [activeTab, setActiveTab] = useState("Rooms");
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({}); // Per-image load tracker

  // Lightbox viewer
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImage, setViewerImage] = useState(null);

  const tabs = ["Rooms", "Restaurant", "Hotel Overview", "Party Room", "Bar"];

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        const images = await fetchGalleryImages(activeTab);
        setPhotos(images);
      } catch (error) {
        console.error("Error loading images:", error);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [activeTab]);

  // Track loaded images for fade-in
  const handleImageLoad = (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
  };

  // Lightbox handlers
  const openViewer = (image) => {
    setViewerImage(image);
    setViewerOpen(true);
  };
  const closeViewer = () => {
    setViewerImage(null);
    setViewerOpen(false);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-8">
        Hotel Gallery
      </h2>

      {/* Tabs */}
      <div className="pb-3 mb-8">
        <div className="flex flex-wrap items-center gap-4 border-b border-[#dbe0e6] px-4 justify-center overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center border-b-[3px] pb-[13px] pt-4 min-w-max ${
                activeTab === tab
                  ? "border-b-[#111418] text-[#111418]"
                  : "border-b-transparent text-[#60758a]"
              }`}
            >
              <p className="text-sm font-bold">{tab}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading images...</p>
        </div>
      ) : photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {photos.map((photo, idx) => {
            const id = photo._id || idx;
            const isLoaded = loadingStates[id];
            return (
              <div
                key={id}
                className="relative w-full max-w-[500px] aspect-[4/3] rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Skeleton while loading */}
                {!isLoaded && <div className="w-full h-full bg-gray-300 animate-pulse rounded-xl" />}

                {/* Image */}
                <img
                  onClick={() => openViewer(photo)}
                  src={photo.url}
                  alt={photo.title || "Gallery Image"}
                  onLoad={() => handleImageLoad(id)}
                  loading="lazy"
                  className={`
                    w-full h-full object-cover rounded-xl cursor-pointer
                    transition-transform duration-300 group-hover:scale-105
                    ${isLoaded ? "opacity-100" : "opacity-0"}
                    transition-opacity duration-500
                  `}
                />

                {/* Enhanced Caption Overlay */}
                {(photo.title || photo.caption) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                    {photo.title && (
                      <h3 className="text-base font-semibold leading-snug drop-shadow-sm truncate">
                        {photo.title}
                      </h3>
                    )}
                    {photo.caption && (
                      <p className="text-sm opacity-90 leading-snug mt-1 line-clamp-2">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📷</div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No images found for {activeTab}
          </h3>
        </div>
      )}

      {/* Lightbox Image Viewer */}
      {viewerOpen && viewerImage && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-6">
          {/* Close Button */}
          <button
            onClick={closeViewer}
            className="absolute top-6 right-8 text-white text-3xl font-bold bg-black/50 px-3 py-1 rounded-lg hover:bg-black/80"
          >
            ✕
          </button>

          {/* Viewer Content */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center relative">
            {/* Skeleton/Loader overlay while big image is loading */}
            {!loadingStates[viewerImage._id] && (
              <div className="w-full max-w-3xl aspect-[16/10] bg-gray-300 animate-pulse rounded-lg flex items-center justify-center text-white">
                Loading...
              </div>
            )}

            {/* The actual viewer image */}
            <img
              src={viewerImage.url}
              alt={viewerImage.title || "Full Image"}
              onLoad={() =>
                setLoadingStates((prev) => ({
                  ...prev,
                  [viewerImage._id]: true,
                }))
              }
              className={`
                max-h-[75vh] w-auto rounded-lg shadow-2xl
                transition-opacity duration-500
                ${loadingStates[viewerImage._id] ? "opacity-100" : "opacity-0"}
              `}
            />

            {/* Title / Caption */}
            {(viewerImage.title || viewerImage.caption) && (
              <div className="text-center text-white mt-4 space-y-1">
                {viewerImage.title && (
                  <h2 className="text-lg font-semibold">{viewerImage.title}</h2>
                )}
                {viewerImage.caption && (
                  <p className="text-sm opacity-80">{viewerImage.caption}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelGallery;
