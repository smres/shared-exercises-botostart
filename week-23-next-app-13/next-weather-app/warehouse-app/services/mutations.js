import { useMutation } from "@tanstack/react-query";

import { api } from "../config/api";

const useLogin = () => {
  const mutationFn = (data) => {
    return api.post("auth/login", data);
  };
  return useMutation({ mutationFn });
};

const useRegister = () => {
  const mutationFn = (data) => {
    return api.post("auth/register", data);
  };
  return useMutation({ mutationFn });
};

const useCreateOrEditProduct = (isActiveEditBtn, selectedProductId) => {
  const mutationFn = (data) => {
    if (!isActiveEditBtn) {
      return api.post("products", data);
    } else if (isActiveEditBtn) {
      return api.put(`products/${selectedProductId}`, data);
    }
  };

  return useMutation({ mutationFn });
};

const useDeleteProduct = () => {
  const mutationFn = (productId) => {
    return api.delete(`products/${productId}`);
  };

  return useMutation({ mutationFn });
};

export { useLogin, useRegister, useCreateOrEditProduct, useDeleteProduct };
