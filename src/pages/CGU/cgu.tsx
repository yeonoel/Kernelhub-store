import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CGU() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>

            {/* Header */}
            <div style={{
                position: "sticky", top: 0, zIndex: 10,
                background: "#fff", borderBottom: "1px solid #F3F4F6",
                padding: "16px 20px", display: "flex", alignItems: "center", gap: 12,
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: 20, color: "#050505", padding: 4, lineHeight: 1,
                    }}
                >
                    ←
                </button>
                <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 18, color: "#050505" }}>
                    Kernel
                </span>
            </div>

            {/* Content */}
            <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px 64px" }}>

                <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 8 }}>
                    Légal
                </p>
                <h1 style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: "clamp(28px, 6vw, 42px)", color: "#050505",
                    letterSpacing: "-1px", lineHeight: 1.1, margin: "0 0 8px",
                }}>
                    Conditions Générales d'Utilisation
                </h1>
                <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 40 }}>
                    Dernière mise à jour : avril 2026
                </p>

                {[
                    {
                        title: "1. Présentation",
                        content: "Kernel est une plateforme permettant à des vendeurs de créer et gérer leur boutique en ligne avec confirmation de commandes via WhatsApp. Kernel est édité et exploité en tant que service indépendant.",
                    },
                    {
                        title: "2. Acceptation des conditions",
                        content: "En créant un compte sur Kernel, vous acceptez sans réserve les présentes Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser la plateforme.",
                    },
                    {
                        title: "3. Création de compte",
                        content: "Pour utiliser Kernel, vous devez créer un compte en fournissant votre nom, votre numéro de téléphone, un mot de passe et les informations de votre boutique. Vous êtes responsable de la confidentialité de vos identifiants. Toute activité effectuée depuis votre compte est sous votre responsabilité.",
                    },
                    {
                        title: "4. Utilisation de la plateforme",
                        content: "Kernel vous permet de créer et personnaliser votre boutique en ligne, gérer vos produits et vos commandes, et recevoir les confirmations de commande via WhatsApp. Vous vous engagez à utiliser Kernel uniquement pour des activités légales et conformes aux lois en vigueur en Côte d'Ivoire et dans votre pays de résidence.",
                    },
                    {
                        title: "5. Contenu interdit",
                        content: "Il est interdit de vendre ou de promouvoir via Kernel des produits illégaux ou contrefaits, des produits dangereux ou réglementés sans autorisation, ou tout contenu à caractère frauduleux, trompeur ou diffamatoire.",
                    },
                    {
                        title: "6. Disponibilité du service",
                        content: "Kernel s'efforce de maintenir la plateforme disponible 7j/7. Toutefois, des interruptions ponctuelles peuvent survenir pour maintenance ou pour des raisons techniques indépendantes de notre volonté. Kernel ne saurait être tenu responsable des préjudices liés à une indisponibilité temporaire.",
                    },
                    {
                        title: "7. Résiliation",
                        content: "Vous pouvez supprimer votre compte à tout moment en contactant le support. Kernel se réserve le droit de suspendre ou supprimer tout compte qui violerait les présentes conditions.",
                    },
                    {
                        title: "8. Modification des CGU",
                        content: "Kernel peut modifier les présentes conditions à tout moment. Les utilisateurs seront informés par email en cas de modification substantielle. La poursuite de l'utilisation de la plateforme après notification vaut acceptation des nouvelles conditions.",
                    },
                    {
                        title: "9. Contact",
                        content: null,
                        contact: true,
                    },
                ].map(({ title, content, contact }) => (
                    <div key={title} style={{ marginBottom: 32 }}>
                        <h2 style={{
                            fontSize: 16, fontWeight: 700, color: "#050505",
                            margin: "0 0 8px", letterSpacing: "-0.3px",
                        }}>
                            {title}
                        </h2>
                        {content && (
                            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, margin: 0 }}>
                                {content}
                            </p>
                        )}
                        {contact && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                <a href="mailto:boutiqueebookinfo@gmail.com" style={{
                                    display: "flex", alignItems: "center", gap: 10,
                                    background: "#F9FAFB", borderRadius: 10, padding: "12px 16px",
                                    textDecoration: "none", color: "#050505", fontSize: 14,
                                    border: "1px solid #F3F4F6",
                                }}>
                                    <span style={{ fontSize: 18 }}>✉</span>
                                    boutiqueebookinfo@gmail.com
                                </a>
                                <a href="https://wa.me/2250504375907" target="_blank" rel="noreferrer" style={{
                                    display: "flex", alignItems: "center", gap: 10,
                                    background: "#F9FAFB", borderRadius: 10, padding: "12px 16px",
                                    textDecoration: "none", color: "#050505", fontSize: 14,
                                    border: "1px solid #F3F4F6",
                                }}>
                                    <span style={{ fontSize: 18 }}>💬</span>
                                    +225 05 04 37 59 07
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}