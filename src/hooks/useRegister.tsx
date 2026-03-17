import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { storesApi } from "@/service/api/store.api";
import type { CreateStoreDto } from "@/types/createStore";

export function useRegister() {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (dto: CreateStoreDto) => storesApi.create(dto),
        onSuccess: () => {
            toast.success("Boutique créée avec succès ! Connectez-vous.");
            navigate("/login");
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message || "Une erreur est survenue. Réessayez.";
            toast.error(message);
        },
    });

    return {
        register: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
    };
}