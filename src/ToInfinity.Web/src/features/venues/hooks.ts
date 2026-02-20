import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as venuesApi from "./api";
import type { SearchVenuesParams } from "./types";
import type { CreateVenueFormData } from "./schemas/create-venue.schema";
import type { EditVenueFormData } from "./schemas/edit-venue.schema";
import type { MutationConfig } from "../../libs/react-query";

const VENUES_QUERY_KEY = "venues";
const MY_VENUES_QUERY_KEY = "my-venues";
const SEARCH_VENUES_QUERY_KEY = "search-venues";

export const useSearchVenues = (params: SearchVenuesParams = {}) => {
  return useQuery({
    queryKey: [SEARCH_VENUES_QUERY_KEY, params],
    queryFn: () => venuesApi.searchVenues(params),
  });
};

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

/** Public venue fetch — no auth required */
export const usePublicVenue = (id: string) => {
  return useQuery({
    queryKey: ["public-venue", id],
    queryFn: () => venuesApi.getPublicVenue(id),
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

export const useUpdateVenue = (
  config?: MutationConfig<typeof venuesApi.updateVenue>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditVenueFormData }) =>
      venuesApi.updateVenue({ id, data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [MY_VENUES_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [VENUES_QUERY_KEY] });
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
