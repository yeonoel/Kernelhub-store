import type { CreateStoreDto } from "@/types/createStore";
import apiClient from "./clients";
import type { CreateStoreResponse } from "@/types/CreateStoreResponse";


export const storesApi = {
    create: async (dto: CreateStoreDto): Promise<CreateStoreResponse> => {
        try {
            const formData = new FormData();
            formData.append("name", dto.name);
            formData.append("whatsappNumber", dto.whatsappNumber);
            formData.append("vendorName", dto.vendorName);
            formData.append("password", dto.password);
            if (dto.description) formData.append("description", dto.description);
            if (dto.logo) formData.append("logo", dto.logo);

            const { data } = await apiClient.post<CreateStoreResponse>("/stores/create", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return data;
        } catch (error) {
            console.error("[Store API] Erreur lors de la création:", error);
            console.log(error);
            throw error;
        }
    },
};