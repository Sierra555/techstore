export function GET() {
  const content = `User-agent: *\nDisallow: /`;
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}