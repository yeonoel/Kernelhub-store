import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/common/Input/Input";
import { Button } from "../../components/common/Button/Button";
import { Lock, Phone, Star } from "lucide-react";
import { loginSchema, type LoginFormData } from "./login.schema";
import { normalizePhone } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Login() {
    const { login, loading, error } = useAuth();

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: "onChange"
    });

    const onSubmit = async (data: LoginFormData) => {
        const normalizedPhone = normalizePhone(data.numero);
        await login(normalizedPhone, data.password);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-cinematic flex flex-col items-center justify-center px-4 py-8 relative">

                <Link
                    to="/"
                    className="hidden md:inline-flex absolute top-6 left-6 items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    ← Accueil
                </Link>

                <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow">
                    <div className="flex flex-col items-center justify-center space-y-3 mb-6">
                        {/* Flèche mobile → logo cliquable */}
                        <Link to="/" className="md:hidden self-start inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-2">
                            ← Accueil
                        </Link>
                        <span className="w-14 h-14 bg-black text-white flex items-center justify-center rounded-full">
                            <Star size={15} />
                        </span>
                        <h1 className="text-xl sm:text-2xl font-bold text-center">Panneau admin</h1>
                        <p className="text-sm text-gray-500 text-center">Connectez-vous pour accéder au dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Numéro"
                            type="tel"
                            placeholder="0707070707"
                            icon={<Phone className="w-4 h-4" />}
                            {...register("numero")}
                            error={errors.numero?.message}
                        />
                        <Input
                            label="Mot de passe"
                            type="password"
                            placeholder="*******"
                            icon={<Lock className="w-4 h-4" />}
                            {...register("password")}
                            error={errors.password?.message}
                        />
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                        <Button
                            type="submit"
                            className="w-full"
                            loading={loading}
                            disabled={!isValid || isSubmitting}>
                            Se connecter
                        </Button>
                        <p className="text-sm text-gray-500 text-center mt-2">
                            Pas encore de boutique ?{" "}
                            <Link to="/inscription" className="text-gray-900 font-semibold hover:underline">
                                Créer ma boutique
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
