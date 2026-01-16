import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(fr|nl)/:path*', '/((?!_next|_vercel|.*\\..*).*)', '/api/:path*']
};
