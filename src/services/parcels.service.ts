import { api } from "@/lib/apiClient";
import { CreateParcelForm, UpdateParcelForm } from "@/schemas/parcels-schema";
import { Parcel } from "@/types/parcel";

export const ParcelsService = {
  async getParcels(): Promise<Parcel[]> {
    const { data } = await api.get("/terrenos/");
    return data;
  },

  async getParcelById(id: string): Promise<Parcel> {
    const { data } = await api.get<Parcel>(`/terrenos/${id}`);
    return data;
  },

  async createParcel(data: CreateParcelForm) {
    const response = await api.post("/terrenos/", data);
    return response.data;
  },

  async updateParcel(id: string, data: UpdateParcelForm) {
    const response = await api.put(`/terrenos/${id}`, data);
    return response.data;
  },

  async deleteParcel(id: string) {
    const response = await api.delete(`/terrenos/${id}`);
    return response.data;
  },
};
