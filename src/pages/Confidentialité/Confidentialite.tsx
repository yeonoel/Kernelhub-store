import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Confidentialite() {
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
                    Politique de Confidentialité
                </h1>
                <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 40 }}>
                    Dernière mise à jour : avril 2026
                </p>

                {[
                    {
                        title: "1. Introduction",
                        content: "Kernel attache une grande importance à la protection de vos données personnelles. Cette politique explique quelles données nous collectons, pourquoi, et comment nous les utilisons.",
                    },
                    {
                        title: "2. Données collectées",
                        content: "Lors de la création de votre compte et de l'utilisation de Kernel, nous collectons : votre nom complet, votre numéro de téléphone, votre mot de passe (chiffré, jamais stocké en clair), ainsi que les informations relatives à votre boutique (nom, logo, description).",
                    },
                    {
                        title: "3. Utilisation des données",
                        content: "Vos données sont utilisées exclusivement pour créer et gérer votre compte et votre boutique, vous permettre de recevoir et gérer vos commandes, vous contacter en cas de besoin (support, notifications importantes), et améliorer la plateforme Kernel.",
                    },
                    {
                        title: "4. Partage des données",
                        content: "Kernel ne vend pas, ne loue pas et ne partage pas vos données personnelles avec des tiers à des fins commerciales. Vos données ne sont partagées qu'avec vos clients (uniquement les informations nécessaires à leurs commandes) ou si la loi l'exige.",
                    },
                    {
                        title: "5. Sécurité des données",
                        content: "Nous mettons en œuvre des mesures techniques appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Les mots de passe sont chiffrés et ne sont jamais accessibles en clair.",
                    },
                    {
                        title: "6. Conservation des données",
                        content: "Vos données sont conservées aussi longtemps que votre compte est actif. En cas de suppression de votre compte, vos données sont effacées dans un délai raisonnable, sauf obligation légale contraire.",
                    },
                    {
                        title: "7. Vos droits",
                        content: "Conformément aux lois applicables, vous disposez d'un droit d'accès à vos données personnelles, d'un droit de rectification en cas d'informations inexactes, d'un droit à la suppression de vos données, et d'un droit de vous opposer au traitement de vos données. Pour exercer ces droits, contactez-nous aux coordonnées ci-dessous.",
                    },
                    {
                        title: "8. Cookies",
                        content: "Kernel peut utiliser des cookies techniques nécessaires au fonctionnement de la plateforme (maintien de session, préférences). Aucun cookie publicitaire ou de tracking tiers n'est utilisé.",
                    },
                    {
                        title: "9. Modification de la politique",
                        content: "Cette politique peut être mise à jour. En cas de changement important, vous serez informé par email. La date de dernière mise à jour est toujours indiquée en haut du document.",
                    },
                    {
                        title: "10. Contact",
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