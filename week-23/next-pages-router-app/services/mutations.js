import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../configs/api";

const useRegister = () => {
  const mutationFn = (data) => api.post("auth/register", data);

  return useMutation({ mutationFn });
};

const useLogin = () => {
  const mutationFn = (data) => api.post("auth/login", data);

  return useMutation({ mutationFn });
};

const useCreateOrEditProduct = (isActiveEditBtn, selectedProductId) => {
  const queryClient = useQueryClient();

  const mutationFn = (data) => {
    if (!isActiveEditBtn) {
      return api.post("products", data);
    } else if (isActiveEditBtn) {
      return api.put(`products/${selectedProductId}`, data);
    }
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["all-products"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

const useDeleteProduct = (productId) => {
  const queryClient = useQueryClient();

  const mutationFn = (data) => {
    console.log(data);

    return api.delete(`products/${productId}`);
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["all-products"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

export { useRegister, useLogin, useCreateOrEditProduct, useDeleteProduct };
