import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useProductsList } from '@/hooks/useProductsList';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockData = {
  paging: {
    total: 100,
    limit: 10,
  },
  items: [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
  ],
};
const queryClient = new QueryClient();

describe('useProductsList', () => {
  it('should return products correctly when the API is called', async () => {

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useProductsList('test'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.data).not.toBeUndefined();
    });
  });

  it('should update totalPages and offset correctly when next page is requested', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useProductsList('test'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.totalPages).toBe(10));

    act(() => {
      result.current.handleNextPage(2);
    });

    expect(result.current.offset).toBe(10);
  });
});