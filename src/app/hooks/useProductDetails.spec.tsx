import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';

import { useProductDetails } from '@/hooks/useProductDetails'; 

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const queryClient = new QueryClient();

describe('useProductDetails', () => {
  it('should return product details when the API call is successful', async () => {
    const mockData = { item: { id: '1', name: 'Product 1', price: 100 } };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useProductDetails('1'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.product).toEqual(mockData.item);
    });
  });
});