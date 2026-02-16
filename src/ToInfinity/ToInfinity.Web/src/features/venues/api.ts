import apiClient from '../../libs/api-client';
import type { Venue, CreateVenueRequest, UpdateVenueRequest } from './types';

export const getVenues = async (): Promise<Venue[]> => {
  const response = await apiClient.get<Venue[]>('/venues');
  return response.data;
};

export const getVenue = async (id: string): Promise<Venue> => {
  const response = await apiClient.get<Venue>(`/venues/${id}`);
  return response.data;
};

export const createVenue = async (data: CreateVenueRequest): Promise<Venue> => {
  const response = await apiClient.post<Venue>('/venues', data);
  return response.data;
};

export const updateVenue = async (id: string, data: UpdateVenueRequest): Promise<Venue> => {
  const response = await apiClient.put<Venue>(`/venues/${id}`, data);
  return response.data;
};

export const deleteVenue = async (id: string): Promise<void> => {
  await apiClient.delete(`/venues/${id}`);
};
