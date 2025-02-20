import { type NextRequest } from 'next/server'
import { transformProductsList } from './handler';

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const offset = searchParams.get('offset');

  if (!query) {
    return new Response(
      JSON.stringify({ message: `Query parameter 'q' is required` }),
      { status: 400 }
    );
  }

  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(query)}&offset=${encodeURIComponent(offset || 0)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    const formattedItems = transformProductsList(data.results); 
    return new Response(
      JSON.stringify({ items: formattedItems, paging: data.paging }),
      { status: response.status }
    );
  } catch (e: unknown) {
    return new Response(
      JSON.stringify({ message: 'An error ocurred while fetching product', error: e }),
      { status: 500 }
    );
  }
}