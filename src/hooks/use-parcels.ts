import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CreateParcelForm, UpdateParcelForm } from "@/schemas/parcels-schema";

import { LocationService } from "@/services/location.service";
import { ParcelsService } from "@/services/parcels.service";

export const parcelKeys = {
  all: ["parcels"] as const,
  detail: (id: string) => ["parcels", "detail", id] as const,
};

export function useGetParcels() {
  return useQuery({
    queryKey: parcelKeys.all,
    queryFn: ParcelsService.getParcels,
  });
}

export function useGetParcelById(id: string) {
  return useQuery({
    queryKey: parcelKeys.detail(id),
    queryFn: () => ParcelsService.getParcelById(id),
    enabled: !!id,
  });
}

export function useReverseGeocode() {
  return useMutation({
    mutationFn: ({
      latitude,
      longitude,
    }: {
      latitude: number;
      longitude: number;
    }) => LocationService.getLocation(latitude, longitude),
  });
}

export function useCreateParcel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateParcelForm) => ParcelsService.createParcel(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: parcelKeys.all,
      });
    },
  });
}

export function useUpdateParcel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateParcelForm }) =>
      ParcelsService.updateParcel(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: parcelKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: parcelKeys.detail(variables.id),
      });
    },
  });
}

export function useDeleteParcel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ParcelsService.deleteParcel(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: parcelKeys.all,
      });

      queryClient.removeQueries({
        queryKey: parcelKeys.detail(id),
      });
    },
  });
}
