import { render, screen, fireEvent } from '@testing-library/react';
import ProductItem from '@/components/ProductItem';
import { Condition, Currency } from '@/interfaces/ProductAPI';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('@/utils/format', () => ({
  formatPrice: jest.fn((amount, currency) => `${currency} ${amount}`)
}));

const mockProduct = {
  id: '1',
  title: 'Produto Teste',
  seller: 'Vendedor Teste',
  picture: '/path/to/product-image.jpg',
  price: {
    currency: Currency.Ars,
    amount: 100,
    decimals: 0,
    regular_amount: 150
  },
  free_shipping: true,
  condition: Condition.Nuevo
};

describe('ProductItem', () => {
 
  it('should render the product details correctly', () => {
    render(<ProductItem product={mockProduct} />);

    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('Por Vendedor Teste')).toBeInTheDocument();
    expect(screen.getByText('ARS 100')).toBeInTheDocument();
    expect(screen.getByText('ARS 150')).toBeInTheDocument();
    expect(screen.getByText('Envio grátis')).toBeInTheDocument();
  });

  it('should navigate to the product detail page when clicked', () => {

    render(<ProductItem product={mockProduct} />);

    fireEvent.click(screen.getByRole('listitem'));

    expect(mockPush).toHaveBeenCalledWith('/items/1');
  });

  it('should not render discount if no regular price is provided', () => {
    const productWithoutDiscount = { ...mockProduct, price: { ...mockProduct.price, regular_amount: null } };

    render(<ProductItem product={productWithoutDiscount} />);

    expect(screen.queryByText('33% OFF')).not.toBeInTheDocument();
  });
});
