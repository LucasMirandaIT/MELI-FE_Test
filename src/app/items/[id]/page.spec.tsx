import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import ItemById from "@/items/[id]/page";
import { useProductDetails } from "@/hooks/useProductDetails";

// Mock the module at the top of your test
jest.mock("@/hooks/useProductDetails", () => ({
  useProductDetails: jest.fn(),
}));


const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
  useParams: jest.fn(() => ({ id: "MLA12345" })),
  useRouter: jest.fn(() => ({
    back: mockBack
  }))
}));

jest.mock("@/hooks/useProductDetails", () => ({
  useProductDetails: jest.fn(() => ({
    product: {
      id: "MLA12345",
      category_path_from_root: [
        { id: "cat1", name: "Category 1" },
        { id: "cat2", name: "Category 2" },
      ],
      price: {
        currency: "ARS",
        amount: 1000,
        regular_amount: 1200,
      },
      attributes: []
    },
  })),
}));

describe("ItemById Page", () => {

  it("should render the product details when product is available", () => {
    render(<ItemById />);

    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();

    expect(screen.getByText(/Publicación:/)).toBeInTheDocument();
    expect(screen.getByText("#MLA12345")).toBeInTheDocument();
  });

  it("should log when clicking on a Breadcrumb category link", () => {
    render(<ItemById />);
    const spy = jest.spyOn(console, "log");

    const categoryItem = screen.getByText("Category 1")
    fireEvent.click(categoryItem);

    expect(spy).toHaveBeenCalledWith("clickBreadcrumb ::: ", "cat1");
    spy.mockRestore();
  });

  it("should go back when clicking on the 'Volver al listado' link", () => {
    render(<ItemById />);
    const goBackBtn = screen.getByText(/Volver al listado/);

    fireEvent.click(goBackBtn);
    expect(mockBack).toHaveBeenCalled();
  });

  it("should render the loading skeleton when product is not available", () => {
    (useProductDetails as jest.Mock).mockReturnValueOnce({
      product: null,
    });

    render(<ItemById />);

    expect(screen.queryByText(/Volver al listado/)).not.toBeInTheDocument();
    expect(screen.getAllByRole("progressbar")).toHaveLength(3); // 3 Skeletons
  });
});
