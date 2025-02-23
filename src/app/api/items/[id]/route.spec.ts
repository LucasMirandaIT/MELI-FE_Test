import { type NextRequest } from "next/server";
import { GET } from "@/api/items/[id]/route";

global.fetch = jest.fn();

describe("GET /api/products/:id", () => {
  it("should fetch product details and return transformed data", async () => {
    const mockProductData = {
      id: "MLA123",
      title: "Test Product",
      currency_id: "ARS",
      price: 200,
      original_price: 300,
      pictures: [{ url: "test.jpg" }],
      attributes: [{ id: "ITEM_CONDITION", value_name: "Nuevo" }, { id: "BRAND", value_name: "Test Brand" }],
      shipping: { free_shipping: true },
      thumbnail: "test.jpg",
      category_id: "MLA999",
    };

    const mockDescriptionData = { plain_text: "This is a great product" };
    const mockBreadcrumbData = { path_from_root: [{ id: 1, name: "Category 1" }, { id: 2, name: "Category 2" }] };
    const mockTransformedProduct = {
      id: "123",
      title: "Test Product",
      price: {
        currency: 'ARS',
        amount: 200,
        decimals: 0,
        regular_amount: 300,
      },
      condition: "Nuevo",
      installments: null,
      sold_quantity: null,
      pictures: [{url: "test.jpg"}],
      description: "This is a great product",
      attributes: [{ id: "BRAND", value_name: "Test Brand" }],
      free_shipping: true,
      category_path_from_root: [{ id: 1, name: "Category 1" }, { id: 2, name: "Category 2" }],
    };
  
    (fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValue(mockProductData) }) // /items/:id
      .mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValue(mockDescriptionData) }) // /items/:id/description
      .mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValue(mockBreadcrumbData) }); // /categories/:category_id

    const request = {} as NextRequest;
    const response = await GET(request, { params: { id: "MLA123" } });

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenNthCalledWith(1, `${process.env.API_URL}/items/MLA123`);
    expect(fetch).toHaveBeenNthCalledWith(2, `${process.env.API_URL}/items/MLA123/description`);
    expect(fetch).toHaveBeenNthCalledWith(3, `${process.env.API_URL}/categories/MLA999`);

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual({ item: mockTransformedProduct });
  });

  it("should return 400 if ID is missing", async () => {
    const request = {} as NextRequest;
    const response = await GET(request, { params: {} });

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json).toEqual({ message: "Parameter 'ID' is required" });
  });

  it("should return 500 on fetch error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("API error"));

    const request = {} as NextRequest;
    const response = await GET(request, { params: { id: "MLA123" } });

    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json).toHaveProperty("message", "An error ocurred while fetching product");
  });
});
