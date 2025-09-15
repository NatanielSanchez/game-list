import { useQuery } from "@tanstack/react-query";
import { getThemes } from "../../services/apiThemes";
import toast from "react-hot-toast";

function useThemes() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["themes"],
    queryFn: getThemes,
    retry: 3,
  });

  if (error) {
    console.error(error);
    toast.error("Something went wrong fetching themes: " + error.message);
  }

  return { themes: data, isLoading, error };
}

export default useThemes;
