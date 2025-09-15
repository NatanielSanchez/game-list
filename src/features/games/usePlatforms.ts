import { useQuery } from "@tanstack/react-query";
import { getPlatforms } from "../../services/apiPlatforms";
import toast from "react-hot-toast";

function usePlatforms() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["platforms"],
    queryFn: getPlatforms,
    retry: 3,
  });

  if (error) {
    console.error(error);
    toast.error("Something went wrong fetching platforms: " + error.message);
  }

  return { platforms: data, isLoading, error };
}

export default usePlatforms;
