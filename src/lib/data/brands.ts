import { Brand } from "../types";

export const brands: Brand[] = [
  { id: "brand_001", name: "BAUBLEBAR" },
  { id: "brand_002", name: "MISSOMA" },
  { id: "brand_003", name: "TIFFANY & Co." },
  { id: "brand_004", name: "ALEX AND ANI" },
  { id: "brand_005", name: "GORJANA" },
  { id: "brand_006", name: "KENDRA SCOTT" },
];

export const getBrands = () => brands;
