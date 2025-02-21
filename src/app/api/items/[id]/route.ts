import { type NextRequest } from 'next/server'
import { transformProductDetails } from './handler';

const baseUrl = process.env.API_URL;

/* eslint-disable-next-line */
export async function GET(request: NextRequest, { params }: any): Promise<Response> {
  const { id } = await params;

  if (!id) {
    return new Response(
      JSON.stringify({ message: `Parameter 'ID' is required` }),
      { status: 400 }
    );
  }

  try {
    const responseItem = await fetch(`${baseUrl}/items/${id}`);
    const itemData = await responseItem.json();

    const responseItemDescription = await fetch(`${baseUrl}/items/${id}/description`);
    const itemDescription = await responseItemDescription.json();

    const responseBreadcrumb = await fetch(`${baseUrl}/categories/${itemData.category_id}`);
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