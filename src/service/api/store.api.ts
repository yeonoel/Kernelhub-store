import type { CreateStoreDto } from "@/types/createStore";
import apiClient from "./clients";



export interface CreateStoreResponse {
    success: boolean;
    message: string;
    data: {
        store: {
            id: string;
            name: string;
            slug: string;
        };
        user: {
            id: string;
            phone: string;
            firstName: string;
        };
    };
}

export const storesApi = {
    create: async (dto: CreateStoreDto): Promise<CreateStoreResponse> => {
        const formData = new FormData();
        formData.append("name", dto.name);
        formData.append("whatsappNumber", dto.whatsappNumber);
        formData.append("vendorName", dto.vendorName);
        formData.append("password", dto.password);
        if (dto.description) formData.append("description", dto.description);
        if (dto.logo) formData.append("logo", dto.logo);

        const { data } = await apiClient.post<CreateStoreResponse>("/stores/create",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return data;
    },
};