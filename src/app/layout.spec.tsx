import Home from '@/page';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from './layout';


const mockPush = jest.fn();
const mockGet = jest.fn();


jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: mockGet,
  })
}));

describe('HomePage', () => {
  it('should render the HomePage component', async () => {
    render(
      <RootLayout>
        <Home />
      </RootLayout>
    );
    const banner = await screen.findByTestId('banner-meli-plus');
    expect(banner).toBeInTheDocument();
  });
});