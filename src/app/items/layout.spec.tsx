import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ItemsLayout from './layout';

const queryClient = new QueryClient();

describe('ItemsLayout', () => {
  it('should render children wrapped in QueryClientProvider', () => {
    render(
      <ItemsLayout>
        <div>Test Child</div>
      </ItemsLayout>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should wrap children inside the QueryClientProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    render(
      <ItemsLayout>
        <div>Child Element</div>
      </ItemsLayout>,
      { wrapper }
    );

    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });
});