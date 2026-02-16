import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as venuesApi from './api';
import type { CreateVenueRequest, UpdateVenueRequest } from './types';

const VENUES_QUERY_KEY = 'venues';

export const useVenues = () => {
  return useQuery({
    queryKey: [VENUES_QUERY_KEY],
    queryFn: venuesApi.getVenues,
  });
};

export const useVenue = (id: string) => {
  return useQuery({
    queryKey: [VENUES_QUERY_KEY, id],
    queryFn: () => venuesApi.getVenue(id),
    enabled: !!id,
  });
};

export const useCreateVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVenueRequest) => venuesApi.createVenue(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VENUES_QUERY_KEY] });
    },
  });
};

export const useUpdateVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVenueRequest }) =>
      venuesApi.updateVenue(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VENUES_QUERY_KEY] });
    },
  });
};

export const useDeleteVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => venuesApi.deleteVenue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VENUES_QUERY_KEY] });
    },
  });
};
