import { useQuery } from "@tanstack/react-query";
import * as locationsApi from "./api";

const LOCATIONS_QUERY_KEY = "locations";

export const useLocations = () => {
  return useQuery({
    queryKey: [LOCATIONS_QUERY_KEY],
    queryFn: locationsApi.getLocations,
    staleTime: Infinity,
  });
};
