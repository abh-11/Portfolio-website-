const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

export function withBasePath(path: `/${string}`): string {
  return `${basePath}${path}`;
}

const deployment = process.env.SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  || 'http://localhost:3000';

export const siteUrl = new URL(`${deployment.replace(/\/$/, '')}/`);
