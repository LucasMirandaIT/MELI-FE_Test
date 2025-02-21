import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useProductDetails = (id: string) => {

  const fetchProductById = async (id: string) => {
    const { data } = await axios.get(`/api/items/${id}`);
    return data;
  };

  const { data } = useQuery({
    queryKey: ["productById", id],
    queryFn: () => fetchProductById(id)
  });

  const product = data?.item;

  return { product };
};