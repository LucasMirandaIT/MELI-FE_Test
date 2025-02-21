import Image from 'next/image';
import React, { useState } from 'react';
import { PhotoSlider } from 'react-photo-view';

import { Picture } from '@/interfaces/ProductDetails';

import 'react-photo-view/dist/react-photo-view.css';
import './ImageGallery.scss';

interface ImageGalleryProps {
  images: Picture[];
}

export default function PhotoGallery({ images }: ImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const [lightbox, setLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(5);

  const openLightbox = () => {
    setLightbox(true);
  };

  return (
    <>
      <div className="image-gallery">
        <div className="image-gallery__thumbnails">
          {images.slice(0, 5).map((image, index) => (
            <button
              key={image.id}
              className={`image-gallery__thumbnail ${index === activeImageIndex ? 'image-gallery__thumbnail--active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View image ${index + 1}`}
              aria-selected={index === activeImageIndex ? 'true' : 'false'}
            >
              <Image src={image.url} alt={`Thumbnail ${index + 1}`} width={100} height={72} />
            </button>
          ))}
          {images.length > 5 && (
            <button className="image-gallery__thumbnail image-gallery__thumbnail--more" aria-label="View more images" onClick={() => openLightbox()}>
              <span>+{images.length - 5}</span>
            </button>
          )}
        </div>

        <div className="image-gallery__main-image">
          <Image
            src={images[activeImageIndex].url}
            alt={`Main view of image ${activeImageIndex + 1}`}
            className="image-gallery__image"
            width={500}
            height={564}
            priority
          />
        </div>
      </div>

      <PhotoSlider
        images={images.map((item) => ({ src: item.url, key: item.id }))}
        visible={lightbox}
        onClose={() => setLightbox(false)}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
};
