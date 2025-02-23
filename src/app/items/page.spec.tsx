import { render, screen } from "@testing-library/react";
import Items from "./page";
import { SearchContext } from "../context/SearchContext"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 


const renderWithSearchContext = (searchTerm: string) => {
  const queryClient = new QueryClient(); 

  return render(
    <QueryClientProvider client={queryClient}>
      <SearchContext.Provider value={{ searchTerm, setSearchTerm: jest.fn() }}>
        <Items />
      </SearchContext.Provider>
    </QueryClientProvider>
  );
};

describe("Items", () => {
  it("should render ProductList when searchTerm is provided", () => {
    renderWithSearchContext("Laptop");

    expect(screen.getByTestId("products")).toBeInTheDocument();
  });

  it("should render 'Type something to search.' when searchTerm is not provided", () => {
    renderWithSearchContext("");

    expect(screen.getByText("Type something to search.")).toBeInTheDocument();
  });
});
