import { useQuery } from "@tanstack/react-query";
import {productDetail} from "./productDetailsApi";

export const useProduct = (id) => {
  const { data: product, isLoading } = useQuery({
    queryFn: () => productDetail(id),
    queryKey: ["product", id],
  });

  return { product, isLoading };
}