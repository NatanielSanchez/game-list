import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../services/apiGenres";
import toast from "react-hot-toast";

function useGenres() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    retry: 3,
  });

  if (error) {
    console.error(error);
    toast.error("Something went wrong fetching genres: " + error.message);
  }

  return { genres: data, isLoading, error };
}

export default useGenres;
