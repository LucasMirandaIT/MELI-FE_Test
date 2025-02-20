import React, { useState } from 'react';
import './ImageGallery.scss';
import { Picture } from '@/interfaces/ProductDetails';
import Image from 'next/image';

interface ImageGalleryProps {
  images: Picture[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <div className="image-gallery">
      <div className="image-gallery__thumbnails">
        {images.map((image, index) => (
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
  );
};
