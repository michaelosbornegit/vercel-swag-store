import { ProductSummaryDTO } from "./product-card";

export type ProductDetailsDTO = ProductSummaryDTO & {
  description: string;
};
