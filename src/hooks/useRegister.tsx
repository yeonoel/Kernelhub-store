import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { storesApi } from "@/service/api/store.api";
import type { CreateStoreDto } from "@/types/createStore";

export function useRegister() {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (dto: CreateStoreDto) => {
            console.log("[useRegister] Démarrage de la création avec les données:", { name: dto.name, whatsappNumber: dto.whatsappNumber });
            return storesApi.create(dto);
        },

        onSuccess: (data) => {
            console.log("[useRegister] Succès ! Réponse reçue:", data);
            toast.success("Boutique créée avec succès ! Connectez-vous.");
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")
            console.log("==============================")

            setTimeout(() => navigate(`/connection`), 1500);

        },
        onError: (error: any) => {
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log("VRAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")


            console.error("[useRegister] Erreur détaillée:", error);
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