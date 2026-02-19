import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as venuesApi from "./api";
import type { CreateVenueFormData } from "./schemas/create-venue.schema";
import type { MutationConfig } from "../../libs/react-query";

const VENUES_QUERY_KEY = "venues";
const MY_VENUES_QUERY_KEY = "my-venues";

export const useVenues = () => {
  return useQuery({
    queryKey: [VENUES_QUERY_KEY],
    queryFn: venuesApi.getVenues,
  });
};

export const useMyVenues = () => {
  return useQuery({
    queryKey: [MY_VENUES_QUERY_KEY],
    queryFn: venuesApi.getMyVenues,
  });
};

export const useVenue = (id: string) => {
  return useQuery({
    queryKey: [VENUES_QUERY_KEY, id],
    queryFn: () => venuesApi.getVenue(id),
    enabled: !!id,
  });
};

export const useCreateVenue = (
  config?: MutationConfig<typeof venuesApi.createVenue>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVenueFormData) => venuesApi.createVenue(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [MY_VENUES_QUERY_KEY] });
      config?.onSuccess?.(data);
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};

export const useDeleteVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => venuesApi.deleteVenue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MY_VENUES_QUERY_KEY] });
    },
  });
};
