import { EXAMPLES_ROUTE, PAGES, PRODUCT_ROUTE } from "../constants/routes";

export const getRouteFromPath = (pathname) => {
  if (pathname === PRODUCT_ROUTE) return PAGES.PRODUCT;
  if (pathname === EXAMPLES_ROUTE) return PAGES.EXAMPLES;
  return PAGES.WAITLIST;
};
