import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductDetails from '@/components/ProductDetails'; 
import { ProductDetailsAPI } from "@/interfaces/ProductDetailsAPI";

const mockProduct: ProductDetailsAPI = {
  id: '1',
  sold_quantity: null,
  installments: null,
  category_path_from_root: [],
  title: 'Produto Teste',
  condition: 'Novo',
  price: {
    amount: 100,
    currency: 'USD',
    decimals: 10,
    regular_amount: null,
  },
  free_shipping: true,
  pictures: [
    { id: '1', url: '/image1.jpg', secure_url: '', size: '', max_size: '', quality: '' },
    { id: '2', url: '/image2.jpg', secure_url: '', size: '', max_size: '', quality: '' },
  ],
  description: 'Descrição do produto',
  attributes: [
    {
      id: '1',
      name: 'Cor',
      value_id: '1',
      value_name: 'Azul',
      values: [
        { id: '1', name: 'Azul', struct: {number: 1, unit: '' }}
      ],
      value_type: 'single',
    },
    {
      id: '2',
      name: 'Tamanho',
      value_id: '2',
      value_name: 'M',
      values: [
        { id: '2', name: 'M', struct: {number: 1, unit: '' }},
        { id: '3', name: 'L', struct: {number: 1, unit: '' }},
      ],
      value_type: 'multi',
    },
  ],
};

const mockProductWithoutDescription: ProductDetailsAPI = {
  id: '1',
  sold_quantity: null,
  installments: null,
  category_path_from_root: [],
  title: 'Produto Teste',
  condition: 'Novo',
  price: {
    amount: 100,
    currency: 'USD',
    decimals: 10,
    regular_amount: null,
  },
  free_shipping: true,
  pictures: [
    { id: '1', url: '/image1.jpg', secure_url: '', size: '', max_size: '', quality: '' },
    { id: '2', url: '/image2.jpg', secure_url: '', size: '', max_size: '', quality: '' },
  ],
  description: null,
  attributes: [
    {
      id: '1',
      name: 'Cor',
      value_id: '1',
      value_name: 'Azul',
      values: [
        { id: '1', name: 'Azul', struct: {number: 1, unit: '' }}
      ],
      value_type: 'single',
    },
    {
      id: '2',
      name: 'Tamanho',
      value_id: '2',
      value_name: 'M',
      values: [
        { id: '2', name: 'M', struct: {number: 1, unit: '' }},
        { id: '3', name: 'L', struct: {number: 1, unit: '' }},
      ],
      value_type: 'multi',
    },
  ],
};

describe('ProductDetails', () => {
  it('should render product details correctly', () => {
    render(<ProductDetails product={mockProduct} />);

    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('US$ 100')).toBeInTheDocument();
  });

  it('should render product details without description', () => {
    render(<ProductDetails product={mockProductWithoutDescription} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('should show snackbar message when clicking buy button', async () => {
    render(<ProductDetails product={mockProduct} />);

    const buyButton = screen.getByRole('button', { name: /comprar ahora/i });

    fireEvent.click(buyButton);

    await waitFor(() => {
      expect(screen.getByText('¡Compraste Produto Teste!')).toBeInTheDocument();
    });
  });

  it('should close snackbar when handleClose is called', async () => {
    render(<ProductDetails product={mockProduct} />);

    const buyButton = screen.getByRole('button', { name: /comprar ahora/i });
    fireEvent.click(buyButton);

    await waitFor(() => {
      expect(screen.getByText('¡Compraste Produto Teste!')).toBeInTheDocument();
    });
  });
});
