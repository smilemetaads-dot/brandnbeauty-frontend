export const siteName = "BrandnBeauty";

export const defaultTitle =
  "BrandnBeauty | Authentic Beauty Marketplace in Bangladesh";

export const defaultDescription =
  "Shop authentic skincare, haircare, makeup and beauty products in Bangladesh from trusted brands.";

const fallbackSiteUrl = "https://brandnbeauty.com";

function normalizeSiteUrl(value: string) {
  try {
    return new URL(value).origin;
  } catch {
    return fallbackSiteUrl;
  }
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl
);

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
