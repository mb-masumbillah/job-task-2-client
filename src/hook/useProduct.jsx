import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProduct = () => {
  const { data: allProduct = [] } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      const res = await axios.get(`https://server-side-blond.vercel.app/allProduct`);
      return res.data;
    },
  });
  return { allProduct };
};

export default useProduct;
