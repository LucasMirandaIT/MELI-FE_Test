import Image from 'next/image';
import './BannerMeliPlus.scss';

import CreditCard from '@/assets/images/banner/credit-card.svg';
import DeliveryTruck from '@/assets/images/banner/delivery-truck.svg';
import DisneyPlus from '@/assets/images/banner/disney+.svg';

export default function BannerMeliPlus() {

  const benefits = [
    {
      img: CreditCard,
      alt: 'Tarjeta de crédito',
      text: 'Hasta 3 cuotas extra sin intereses'
    },
    {
      img: DeliveryTruck,
      alt: 'Camión de reparto',
      text: 'Envíos gratis y rápidos desde $ 30.000 y 45% OFF en envíos desde $ 6.000'
    },
    {
      img: DisneyPlus,
      alt: 'Disney+ logo',
      text: 'Disney+ incluido'
    },
  ];

  return (
    <section className="banner__container">
      <div className="banner__header">
        <h2 className="banner__header__title">Mercado Puntos</h2>
        <p className="banner__header__description">Suma puntos y obtené beneficios</p>
      </div>
      <div className="banner__content">
        {benefits.map((benefit, index) => (
          <div className="banner__benefit" key={index}>
            <Image src={benefit.img} alt={benefit.alt} width={50} height={50} />
            <p>{benefit.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
};
