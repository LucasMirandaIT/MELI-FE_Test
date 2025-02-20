import { type NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest, response: NextResponse) {
  return new Response(
    JSON.stringify({ message: 'Success'}),
    { status: response.status }
  );
}