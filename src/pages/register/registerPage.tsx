import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegister } from "@/hooks/useRegister";
import type { CreateStoreDto } from "@/types/createStore";
import { isValidCIPhone, normalizePhone } from "@/lib/utils";
import { Field } from "@/components/common/Field/Field";
import { NavLink } from "react-router-dom";


// Schemas
const step1Schema = yup.object({
    name: yup.string().min(2, "Minimum 2 caractères").required("Nom requis"),
    whatsappNumber: yup
        .string()
        .required("Numéro WhatsApp requis")
        .test("ci-phone", "Numéro invalide", (v) => isValidCIPhone(v ?? "")),
    description: yup.string().optional().default(""),
});

const step2Schema = yup.object({
    vendorName: yup.string().min(2, "Minimum 2 caractères").required("Prénom requis"),
    password: yup.string().min(6, "Minimum 6 caractères").required("Mot de passe requis"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
        .required("Confirmation requise"),
});

type Step1Fields = yup.InferType<typeof step1Schema>;
type Step2Fields = yup.InferType<typeof step2Schema>;

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
    page: {
        minHeight: "100vh", background: "#F9FAFB",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px", fontFamily: "'Inter', system-ui, sans-serif",
    } as React.CSSProperties,
    card: {
        background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB",
        padding: "40px 36px", width: "100%", maxWidth: 460,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    } as React.CSSProperties,
    label: { display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 } as React.CSSProperties,
    input: (hasError: boolean): React.CSSProperties => ({
        width: "100%", padding: "11px 14px", fontSize: 14, color: "#111827",
        background: "#F9FAFB", border: `1px solid ${hasError ? "#EF4444" : "#E2E2E2"}`,
        borderRadius: 8, outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
    }),
    error: { fontSize: 12, color: "#EF4444", marginTop: 5, display: "block" } as React.CSSProperties,
    btn: (disabled: boolean): React.CSSProperties => ({
        width: "100%", padding: "13px",
        background: disabled ? "#D1D5DB" : "#050505", color: "#fff",
        fontSize: 14, fontWeight: 700, borderRadius: 8, border: "none",
        cursor: disabled ? "not-allowed" : "pointer", letterSpacing: "0.02em",
        transition: "background 0.2s, transform 0.15s", marginTop: 8,
    }),
};



function StepIndicator({ current }: { current: 1 | 2 }) {
    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
            {[1, 2].map((n, i) => (
                <div key={n} style={{ display: "flex", alignItems: "center", flex: i === 0 ? "none" : 1 }}>
                    {i > 0 && <div style={{ flex: 1, height: 1, background: current > 1 ? "#050505" : "#E5E7EB", transition: "background 0.3s", margin: "0 8px" }} />}
                    <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: n <= current ? "#050505" : "#F3F4F6",
                        color: n <= current ? "#fff" : "#9CA3AF",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 700,
                        border: `2px solid ${n <= current ? "#050505" : "#E5E7EB"}`,
                        transition: "all 0.3s", flexShrink: 0,
                    }}>
                        {n < current ? "✓" : n}
                    </div>
                </div>
            ))}
        </div>
    );
}

function LogoUpload({ value, onChange, storeName }: { value: File | null; onChange: (f: File | null) => void; storeName: string }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const preview = value ? URL.createObjectURL(value) : null;
    const initial = storeName?.charAt(0)?.toUpperCase() || "K";
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div onClick={() => inputRef.current?.click()} style={{
                width: 64, height: 64, borderRadius: 12, background: preview ? "transparent" : "#F3F4F6",
                border: "2px dashed #D1D5DB", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", overflow: "hidden", flexShrink: 0, transition: "border-color 0.2s",
            }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#6B7280")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#D1D5DB")}>
                {preview
                    ? <img src={preview} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontSize: 22, fontWeight: 700, color: "#9CA3AF" }}>{initial}</span>}
            </div>
            <div>
                <button type="button" onClick={() => inputRef.current?.click()} style={{
                    fontSize: 13, fontWeight: 500, color: "#374151", background: "#F3F4F6",
                    border: "1px solid #E5E7EB", borderRadius: 6, padding: "7px 14px", cursor: "pointer",
                }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#E5E7EB")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#F3F4F6")}>
                    {value ? "Changer le logo" : "Ajouter un logo"}
                </button>
                {value && (
                    <button type="button" onClick={() => onChange(null)} style={{ fontSize: 12, color: "#EF4444", background: "none", border: "none", cursor: "pointer", marginLeft: 10 }}>
                        Supprimer
                    </button>
                )}
                <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 5 }}>PNG, JPG · max 2 Mo</p>
            </div>
            <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/jpg" style={{ display: "none" }}
                onChange={e => {
                    const f = e.target.files?.[0];
                    if (f && f.size <= 2 * 1024 * 1024) onChange(f);
                    else if (f) alert("Fichier trop lourd (max 2 Mo)");
                }} />
        </div>
    );
}

export default function RegisterPage() {
    const [step, setStep] = useState<1 | 2>(1);
    const [step1Data, setStep1Data] = useState<Step1Fields | null>(null);
    const [logo, setLogo] = useState<File | null>(null);
    const { register: submitRegister, isLoading } = useRegister();

    //`as any` pour contourner le conflit de types yup/react-hook-form
    const form1 = useForm<Step1Fields>({
        resolver: yupResolver(step1Schema) as any,
        defaultValues: { name: "", whatsappNumber: "", description: "" },
    });

    const form2 = useForm<Step2Fields>({
        resolver: yupResolver(step2Schema) as any,
        defaultValues: { vendorName: "", password: "", confirmPassword: "" },
    });

    const watchName = form1.watch("name") || "";

    const onStep1Submit = (data: Step1Fields) => {
        console.log("[RegisterPage] Étape 1 - Soumission du formulaire");
        setStep1Data(data);
        setStep(2);
    };

    const onStep2Submit = (data: Step2Fields) => {
        console.log("[RegisterPage] Étape 2 - Soumission du formulaire");
        if (!step1Data) {
            console.error("[RegisterPage] Erreur : step1Data est manquant");
            return;
        }
        const dto: CreateStoreDto = {
            name: step1Data.name,
            whatsappNumber: normalizePhone(step1Data.whatsappNumber),
            description: step1Data.description,
            vendorName: data.vendorName,
            password: data.password,
            logo: logo ?? undefined,
        };
        console.log("[RegisterPage] DTO préparé:", { name: dto.name, whatsappNumber: dto.whatsappNumber, vendorName: dto.vendorName, hasLogo: !!dto.logo });

        submitRegister(dto);
    };

    return (
        <div style={S.page}>
            <div style={S.card}>
                <div style={{ marginBottom: 28 }}>
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                        <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, color: "#050505", letterSpacing: "-0.5px" }}>Kernel</span>
                    </NavLink>
                    <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "16px 0 4px", letterSpacing: "-0.4px" }}>
                        {step === 1 ? "Créez votre boutique" : "Vos informations"}
                    </h1>
                    <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>
                        {step === 1 ? "Configurez votre boutique en quelques secondes." : "Ces informations vous serviront à vous connecter."}
                    </p>
                </div>

                <StepIndicator current={step} />

                {step === 1 && (
                    <form onSubmit={form1.handleSubmit(onStep1Submit)} noValidate>
                        <LogoUpload value={logo} onChange={setLogo} storeName={watchName} />
                        <Field label="Nom de la boutique" error={form1.formState.errors.name?.message} S={S}>
                            <input {...form1.register("name")} placeholder="Ex: Tech Universe" style={S.input(!!form1.formState.errors.name)}
                                onFocus={e => (e.target.style.borderColor = "#6B7280")}
                                onBlur={e => (e.target.style.borderColor = form1.formState.errors.name ? "#EF4444" : "#E2E2E2")} />
                        </Field>
                        <Field label="Numéro WhatsApp (identifiant de connexion)" S={S} error={form1.formState.errors.whatsappNumber?.message} hint="Formats acceptés : 0747492156 · 2250747492156 · +2250747492156">
                            <input {...form1.register("whatsappNumber")} placeholder="Ex: 0747492156" inputMode="numeric" style={S.input(!!form1.formState.errors.whatsappNumber)}
                                onFocus={e => (e.target.style.borderColor = "#6B7280")}
                                onBlur={e => (e.target.style.borderColor = form1.formState.errors.whatsappNumber ? "#EF4444" : "#E2E2E2")} />
                        </Field>
                        <Field label="Description" S={S} optional>
                            <textarea {...form1.register("description")} placeholder="Décrivez votre boutique en quelques mots..." rows={3}
                                style={{ ...S.input(false), resize: "vertical", lineHeight: 1.6 }}
                                onFocus={e => (e.target.style.borderColor = "#6B7280")}
                                onBlur={e => (e.target.style.borderColor = "#E2E2E2")} />
                        </Field>
                        <button type="submit" style={S.btn(false)}
                            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-1px)")}
                            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                            Continuer →
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={form2.handleSubmit(onStep2Submit)} noValidate>
                        <Field label="Votre prénom" S={S} error={form2.formState.errors.vendorName?.message}>
                            <input {...form2.register("vendorName")} placeholder="Ex: Noel" style={S.input(!!form2.formState.errors.vendorName)}
                                onFocus={e => (e.target.style.borderColor = "#6B7280")}
                                onBlur={e => (e.target.style.borderColor = form2.formState.errors.vendorName ? "#EF4444" : "#E2E2E2")} />
                        </Field>

                        <Field label="Mot de passe" S={S} error={form2.formState.errors.password?.message}>
                            <input {...form2.register("password")} type="password" placeholder="Minimum 6 caractères" style={S.input(!!form2.formState.errors.password)}
                                onFocus={e => (e.target.style.borderColor = "#6B7280")}
                                onBlur={e => (e.target.style.borderColor = form2.formState.errors.password ? "#EF4444" : "#E2E2E2")} />
                        </Field>
                        <Field label="Confirmer le mot de passe" S={S} error={form2.formState.errors.confirmPassword?.message}>
                            <input {...form2.register("confirmPassword")} type="password" placeholder="Répétez votre mot de passe" style={S.input(!!form2.formState.errors.confirmPassword)}
                                onFocus={e => (e.target.style.borderColor = "#6B7280")}
                                onBlur={e => (e.target.style.borderColor = form2.formState.errors.confirmPassword ? "#EF4444" : "#E2E2E2")} />
                        </Field>
                        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                            <button type="button" onClick={() => setStep(1)} style={{
                                flex: 1, padding: "13px", background: "#F3F4F6", color: "#374151",
                                fontSize: 14, fontWeight: 600, borderRadius: 8, border: "1px solid #E5E7EB", cursor: "pointer",
                            }}>← Retour</button>
                            <button type="submit" disabled={isLoading} style={{ ...S.btn(isLoading), flex: 2, marginTop: 0 }}>
                                {isLoading ? "Création en cours..." : "Créer ma boutique"}
                            </button>
                        </div>
                    </form>
                )}

                <p style={{ textAlign: "center", fontSize: 13, color: "#6B7280", marginTop: 24, marginBottom: 0 }}>
                    Déjà un compte ?{" "}
                    <NavLink to="/connection" style={{ color: "#111827", fontWeight: 600, textDecoration: "none" }}>Se connecter</NavLink>
                </p>
            </div>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #9CA3AF; }
      `}</style>
        </div>
    );
}