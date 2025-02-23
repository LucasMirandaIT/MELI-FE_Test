import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Header from "@/components/Header";
import { SearchProvider } from "@/context/SearchContext";

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

jest.mock("@/context/SearchContext", () => ({
  ...jest.requireActual("../../context/SearchContext"),
  useSearch: () => ({
    setSearchTerm: jest.fn(),
    setsearchInput: jest.fn(),
  }),
}));

describe('Header', () => {
  it('should render correctly', () => {
    render(
      <SearchProvider>
        <Header />
      </SearchProvider>
    );

    expect(screen.getByAltText(/mercadolibre logo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar productos, marcas y más…")).toBeInTheDocument();
  });

  it('should allow typing in the search bar', () => {
    render(
      <SearchProvider>
        <Header />
      </SearchProvider>
    );

    const searchInput = screen.getByPlaceholderText("Buscar productos, marcas y más…");

    fireEvent.change(searchInput, { target: { value: 'New Product' } });

    expect(searchInput).toHaveValue('New Product');
  });

  it('should redirect correctly when clicking the search icon', async () => {
    render(
      <SearchProvider>
        <Header />
      </SearchProvider>
    );

    const searchInput = screen.getByPlaceholderText("Buscar productos, marcas y más…");

    fireEvent.change(searchInput, { target: { value: 'New Product' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' })

    const searchButton = screen.getByRole('button');
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/items?search=New Product');
    });
  });

  it('should navigate to home when logo is clicked', async () => {
    render(
      <SearchProvider>
        <Header />
      </SearchProvider>
    );

    const logo = screen.getByAltText(/mercadolibre logo/i);
    userEvent.click(logo);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('should update searchInput and searchTerm from query in useEffect', () => {
    mockGet.mockReturnValue('New Product Query');

    render(
      <SearchProvider>
        <Header />
      </SearchProvider>
    );

    expect(mockGet).toHaveBeenCalledWith('search');
  });
});
