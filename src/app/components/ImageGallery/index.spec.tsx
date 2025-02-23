import { render, screen, fireEvent } from '@testing-library/react';
import PhotoGallery from '@/components/ImageGallery';
import { Picture } from '@/interfaces/ProductDetails';

interface ImageProps {
  alt: string;
  src: string;
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: ImageProps) => <img alt={alt} src={src} {...props} />,
}));

const images: Picture[] = [
  {
    id: '1',
    url: '/image1.jpg',
    secure_url: '',
    size: '',
    max_size: '',
    quality: '',
  },
  {
    id: '2',
    url: '/image2.jpg',
    secure_url: '',
    size: '',
    max_size: '',
    quality: '',
  },
  {
    id: '3',
    url: '/image3.jpg',
    secure_url: '',
    size: '',
    max_size: '',
    quality: '',
  },
  {
    id: '4',
    url: '/image4.jpg',
    secure_url: '',
    size: '',
    max_size: '',
    quality: '',
  },
  {
    id: '5',
    url: '/image5.jpg',
    secure_url: '',
    size: '',
    max_size: '',
    quality: '',
  },
  {
    id: '6',
    url: '/image6.jpg',
    secure_url: '',
    size: '',
    max_size: '',
    quality: '',
  },
];

describe('PhotoGallery', () => {
  it('should render thumbnails correctly', () => {
    render(<PhotoGallery images={images} />);

    const thumbnails = screen.getAllByRole('button', { name: /view image/i });
    expect(thumbnails).toHaveLength(5);

    thumbnails.forEach((thumbnail, index) => {
      expect(thumbnail).toHaveAttribute('aria-label', `View image ${index + 1}`);
    });
  });

  it('should change active image on thumbnail click', () => {
    render(<PhotoGallery images={images} />);

    const thumbnails = screen.getAllByRole('button', { name: /view image/i });

    fireEvent.click(thumbnails[1]);

    const mainImage = screen.getByAltText(/main view of image 2/i);
    expect(mainImage).toHaveAttribute('src', '/image2.jpg');
  });

  it('should open lightbox when "view more images" button is clicked', () => {
    render(<PhotoGallery images={images} />);

    const viewMoreButton = screen.getByTestId('more-images');
    fireEvent.click(viewMoreButton);

    const photoSlider = screen.getByRole('dialog');
    expect(photoSlider).toBeInTheDocument();
  });

  it('should display the correct main image when a thumbnail is clicked', () => {
    render(<PhotoGallery images={images} />);

    const mainImage = screen.getByAltText('Main view of image 1');
    expect(mainImage).toHaveAttribute('src', '/image1.jpg');

    const thumbnails = screen.getAllByRole('button', { name: /view image/i });
    fireEvent.click(thumbnails[2]);

    const updatedMainImage = screen.getByAltText('Main view of image 3');
    expect(updatedMainImage).toHaveAttribute('src', '/image3.jpg');
  });

  it('should display the correct image when lightbox is opened and navigate through images', () => {
    render(<PhotoGallery images={images} />);

    const viewMoreButton = screen.getByTestId('more-images');
    fireEvent.click(viewMoreButton);

    const photoSlider = screen.getByRole('dialog');
    expect(photoSlider).toBeInTheDocument();
  });
});
