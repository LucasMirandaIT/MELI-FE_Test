import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductList from "@/components/ProductList";
import { useProductsList } from "@/hooks/useProductsList";

const mockHandleNextPage = jest.fn();

const mockProducts = [
  {
    id: "1",
    title: "Product 1",
    price: { currency: "ARS", amount: 100, decimals: 2, regular_amount: 120 },
    picture: "/path/to/image1.jpg",
    condition: "Nuevo",
    free_shipping: true,
    seller: "Seller 1"
  },
  {
    id: "2",
    title: "Product 2",
    price: { currency: "ARS", amount: 150, decimals: 2, regular_amount: 180 },
    picture: "/path/to/image2.jpg",
    condition: "Usado",
    free_shipping: false,
    seller: "Seller 2"
  }
];

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../context/SearchContext", () => ({
  useSearch: () => ({
    searchTerm: '',
  })
}));

jest.mock("../../hooks/useProductsList", () => ({
  useProductsList: jest.fn()
}));

describe("ProductList", () => {

  beforeEach(() => {
    (useProductsList as jest.Mock).mockReturnValue({
      data: { pages: [mockProducts] },
      totalPages: 2,
      handleNextPage: mockHandleNextPage,
      offset: 0,
      isPending: false,
      error: null
    });
  });

  it("should render the product list with the correct items", () => {
    render(<ProductList />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it('should render multiple skeleton loaders', async () => {
    (useProductsList as jest.Mock).mockReturnValue({
      isPending: true,
    });

    render(<ProductList />);
  
    await waitFor(() => {
      const skeletons = document.getElementsByClassName('MuiSkeleton-root');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });
  
  it("should handle pagination correctly", async () => {
    render(<ProductList />);

    const nextButton = await screen.findByLabelText(/Go to next page/i);

    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    await waitFor(() => {
      const pages = document.getElementsByClassName('MuiButtonBase-root');
      expect(pages.length).toBeGreaterThan(1);
    });
  });

  it("should display an error message when there is an error", () => {
    (useProductsList as jest.Mock).mockReturnValue({
      error: "Error al cargar productos",
    });

    render(<ProductList />);

    expect(screen.getByText("Error al cargar productos.")).toBeInTheDocument();
  });
});
