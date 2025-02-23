import { render, screen } from '@testing-library/react';
import BannerMeliPlus from './index'; 

const benefitsMock = [
  {
    text: 'Hasta 3 cuotas extra sin intereses',
    alt: 'Tarjeta de crédito',
  },
  {
    text: 'Envíos gratis y rápidos desde $ 30.000 y 45% OFF en envíos desde $ 6.000',
    alt: 'Camión de reparto',
  },
  {
    text: 'Disney+ incluido',
    alt: 'Disney+ logo',
  },
];

describe('BannerMeliPlus Component', () => {
  it('should render the title and description correctly', () => {
    render(<BannerMeliPlus />);

    expect(screen.getByText('Mercado Puntos')).toBeInTheDocument();
    expect(screen.getByText('Suma puntos y obtené beneficios')).toBeInTheDocument();
  });

  it('should render the correct benefits with images and text', () => {
    render(<BannerMeliPlus />);

    benefitsMock.forEach((benefit) => {
      expect(screen.getByAltText(benefit.alt)).toBeInTheDocument();

      expect(screen.getByText(benefit.text)).toBeInTheDocument();
    });
  });
});
