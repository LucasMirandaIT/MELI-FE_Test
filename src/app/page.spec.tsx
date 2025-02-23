import Home from '@/page';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';


describe('HomePage', () => {
  it('should render the HomePage component', async () => {
    render(<Home />);
    const banner = await screen.findByTestId('banner-meli-plus');
    expect(banner).toBeInTheDocument();
  });
});