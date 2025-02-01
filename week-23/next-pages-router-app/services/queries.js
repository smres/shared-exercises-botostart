import { useQuery } from "@tanstack/react-query";
import api from "../configs/api";

const useGetAllProducts = (currentPage, limitShow = 10) => {
  const queryKey = ["all-products", currentPage, limitShow];
  const queryFn = () =>
    api.get(`products?page=${currentPage}&limit=${limitShow}`);
  return useQuery({ queryKey, queryFn });
};

export { useGetAllProducts };
