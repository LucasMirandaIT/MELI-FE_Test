import { type NextRequest } from 'next/server'
import { transformProductDetails } from './handler';

const url = `https://api.mercadolibre.com`;

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  const { id } = await params;

  if (!id) {
    return new Response(
      JSON.stringify({ message: `Parameter 'ID' is required` }),
      { status: 400 }
    );
  }

  try {
    const responseItem = await fetch(`${url}/items/${id}`);
    const itemData = await responseItem.json();

    const responseItemDescription = await fetch(`${url}/items/${id}/description`);
    const itemDescription = await responseItemDescription.json();

    const responseBreadcrumb = await fetch(`${url}/categories/${itemData.category_id}`);
    const itemBreadcrumb = await responseBreadcrumb.json();

    const formattedItem = transformProductDetails(itemData, itemDescription.plain_text, itemBreadcrumb.path_from_root);
    return new Response(
      JSON.stringify({ item: formattedItem }),
      { status: 200 }
    );
  } catch (e: unknown) {
    return new Response(
      JSON.stringify({ message: 'An error ocurred while fetching product', error: e }),
      { status: 500 }
    );
  }
}