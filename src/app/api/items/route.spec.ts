import { NextRequest } from "next/server";
import { GET } from "@/api/items/route";

global.fetch = jest.fn();

describe("GET /api/products", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if query parameter 'q' is missing", async () => {
    const request = {
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
    } as NextRequest;

    const response = await GET(request);
    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json).toEqual({ message: "Query parameter 'q' is required" });
  });

  it("should fetch products and return transformed items", async () => {
    const mockApiResponse = {
      results: [
        {
          id: "MLA123", title: "Test Product",
          currency_id: "ARS", price: 1000,
          sale_price: { regular_amount: 1200 },
          thumbnail: "https://test.com/image.jpg",
          attributes: [{ id: "ITEM_CONDITION", value_name: "Nuevo" }],
          shipping: { free_shipping: true },
          seller: { nickname: "test_seller" }
        }
      ],
      paging: { total: 1 },
    };

    const mockApiTransformed = {
      id: "MLA123",
      title: "Test Product",
      price: {
        currency: "ARS",
        amount: 1000,
        decimals: 0,
        regular_amount: 1200,
      },
      picture: "https://test.com/image.jpg",
      condition: "Nuevo",
      free_shipping: true,
      seller: "test_seller"
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockApiResponse),
    });

    const request = {
      nextUrl: {
        searchParams: new URLSearchParams({ q: "laptop", offset: "10" }),
      },
    } as NextRequest;

    const response = await GET(request);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.API_URL}/sites/MLA/search?q=laptop&offset=10`
    );

    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.items[0]).toEqual(mockApiTransformed);
    expect(json.paging).toEqual(mockApiResponse.paging);
  });

  it("should return 500 if fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("API error"));

    const request = {
      nextUrl: {
        searchParams: new URLSearchParams({ q: "laptop" }),
      },
    } as NextRequest;

    const response = await GET(request);
    expect(response.status).toBe(500);

    const json = await response.json();
    expect(json.message).toBe("An error ocurred while fetching products list");
  });
});
