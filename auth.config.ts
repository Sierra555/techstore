import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig = {
  providers: [],
  callbacks: {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     authorized({ request, auth }: any) {
      //Array of regex patterns of paths to protect
      const protectedPaths = [
          /\/shipping-address/,
          /\/payment-method/,
          /\/place-order/,
          /\/profile/,
          /\/user\/(.*)/,
          /\/order\/(.*)/,
          /\/admin/,
      ];

      const { pathname } = request.nextUrl;

      if (!auth && protectedPaths.some((path) => path.test(pathname))) return false;
      //Check for session cart cookie
      if (!request.cookies.get('sessionCartId')) {
        const sessionCartId = crypto.randomUUID();

        const newReqHeaders = new Headers(request.headers);

        const response = NextResponse.next({
          request: {
              headers: newReqHeaders
          }
        });

        response.cookies.set('sessionCartId', sessionCartId);
        return response;
      } else {
          return true;
      }
  }
  }
} satisfies NextAuthConfig