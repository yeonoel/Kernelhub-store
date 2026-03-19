import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { storesApi } from "@/service/api/store.api";
import type { CreateStoreDto } from "@/types/createStore";

export function useRegister() {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (dto: CreateStoreDto) => {
            return storesApi.create(dto);
        },

        onSuccess: () => {
            toast.success("Boutique créée avec succès ! Connectez-vous.");
            setTimeout(() => navigate(`/connection`), 1500);

        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message || error?.message || "Une erreur est survenue. Réessayez.";
            toast.error(message);
        },
    });

    return {
        register: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
    };
}