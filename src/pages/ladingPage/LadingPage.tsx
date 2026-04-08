import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Feature {
    icon: string;
    title: string;
    desc: string;
}

interface Step {
    num: string;
    title: string;
    desc: string;
}

interface Testimonial {
    name: string;
    role: string;
    quote: string;
    avatar: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const FEATURES: Feature[] = [
    { icon: "◈", title: "Boutique en 1 minutes", desc: "Configurez votre vitrine, ajoutez vos produits et commencez à vendre immédiatement." },
    { icon: "◉", title: "Commandes via WhatsApp", desc: "Vos clients commandent sur votre boutique et confirment en un message WhatsApp. Simple et rapide." }, { icon: "◎", title: "Dashboard complet", desc: "Suivez vos ventes, gérez vos stocks et analysez vos performances en temps réel." },
];

const STEPS: Step[] = [
    { num: "01", title: "Créez votre compte", desc: "Inscription en moins de 30 secondes. Aucune carte bancaire requise." },
    { num: "02", title: "Configurez votre boutique", desc: "Logo, Nom, produits — votre boutique est prête en quelques clics." },
    { num: "03", title: "Partagez & vendez", desc: "Diffusez votre lien boutique. Vos clients commandent, vous livrez, vous encaissez." },
];

const TESTIMONIALS: Testimonial[] = [
    { name: "Mariam D.", role: "Créatrice de mode, Abidjan", quote: "En 3 semaines j'avais déjà 40 commandes. Kernel a changé ma façon de vendre.", avatar: "M" },
    { name: "Kofi A.", role: "Épicerie fine, Dakar", quote: "Le lien WhatsApp c'est magique. Mes clients adorent la simplicité.", avatar: "K" },
    { name: "Aïcha B.", role: "Cosmétiques naturels, Bamako", quote: "Je gère 3 boutiques depuis mon téléphone. Incroyable pour le prix.", avatar: "A" },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useIntersection(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    // Ferme le menu si on clique un lien
    const handleNav = () => setMenuOpen(false);

    // Bloque le scroll body quand menu ouvert
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
                background: scrolled || menuOpen ? "rgba(5,5,5,0.95)" : "transparent",
                backdropFilter: scrolled || menuOpen ? "blur(18px)" : "none",
                borderBottom: scrolled && !menuOpen ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
            }}>
                <div style={{
                    maxWidth: 1200, margin: "0 auto",
                    padding: "0 24px", height: 64,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                    {/* Logo */}
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                        <span style={{
                            fontFamily: "'DM Serif Display', Georgia, serif",
                            fontSize: 24, color: "#fff", letterSpacing: "-0.5px",
                        }}>
                            Kernel
                        </span>
                    </NavLink>

                    {/* Desktop links */}
                    <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
                        <a href="#features" style={linkStyle}
                            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                            Fonctionnalités
                        </a>
                        <NavLink to="/conection" style={ghostBtnStyle}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
                            Connexion
                        </NavLink>
                        <NavLink to="/inscription" style={primaryBtnStyle}
                            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                            Créer ma boutique
                        </NavLink>
                    </div>

                    {/* Hamburger */}
                    <button
                        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(o => !o)}
                        style={{
                            background: "none", border: "none", cursor: "pointer",
                            padding: 8, display: "none", flexDirection: "column",
                            gap: 5, alignItems: "center", justifyContent: "center",
                        }}
                        className="hamburger"
                    >
                        <span style={{
                            display: "block", width: 22, height: 1.5, background: "#fff",
                            transition: "transform 0.25s, opacity 0.25s",
                            transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
                        }} />
                        <span style={{
                            display: "block", width: 22, height: 1.5, background: "#fff",
                            transition: "opacity 0.2s",
                            opacity: menuOpen ? 0 : 1,
                        }} />
                        <span style={{
                            display: "block", width: 22, height: 1.5, background: "#fff",
                            transition: "transform 0.25s, opacity 0.25s",
                            transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
                        }} />
                    </button>
                </div>

                {/* Mobile menu */}
                <div style={{
                    overflow: "hidden",
                    maxHeight: menuOpen ? 320 : 0,
                    transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
                    borderTop: menuOpen ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}>
                    <div style={{ padding: "24px 24px 32px", display: "flex", flexDirection: "column", gap: 8 }}>
                        <a href="#features" onClick={handleNav} style={{
                            color: "rgba(255,255,255,0.7)", fontSize: 16, textDecoration: "none",
                            padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
                            fontWeight: 400, letterSpacing: "0.01em",
                            transition: "color 0.2s",
                        }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>
                            Fonctionnalités
                        </a>
                        <NavLink to="/connection" onClick={handleNav} style={{
                            color: "rgba(255,255,255,0.7)", fontSize: 16, textDecoration: "none",
                            padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
                            fontWeight: 400,
                            transition: "color 0.2s",
                        }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>
                            Connexion
                        </NavLink>
                        <NavLink to="/inscription" onClick={handleNav} style={{
                            display: "block", marginTop: 8,
                            background: "#fff", color: "#000",
                            fontSize: 15, fontWeight: 700,
                            padding: "14px 0", borderRadius: 8,
                            textDecoration: "none", textAlign: "center",
                            letterSpacing: "0.02em",
                        }}>
                            Créer ma boutique →
                        </NavLink>
                    </div>
                </div>
            </nav>

            {/* Responsive styles */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

        .desktop-nav {
          display: flex !important;
        }
        .hamburger {
          display: none !important;
        }

        @media (max-width: 640px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger {
            display: flex !important;
          }
        }
      `}</style>
        </>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const linkStyle: React.CSSProperties = {
    color: "rgba(255,255,255,0.55)",
    fontSize: 14, textDecoration: "none",
    letterSpacing: "0.02em",
    transition: "color 0.2s",
};

const ghostBtnStyle: React.CSSProperties = {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13, fontWeight: 500,
    padding: "7px 18px", borderRadius: 6,
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.15)",
    letterSpacing: "0.02em",
    transition: "border-color 0.2s, color 0.2s",
};

const primaryBtnStyle: React.CSSProperties = {
    background: "#fff", color: "#000",
    fontSize: 13, fontWeight: 700,
    padding: "8px 20px", borderRadius: 6,
    textDecoration: "none",
    letterSpacing: "0.02em",
    transition: "opacity 0.2s, transform 0.2s",
};

function Hero() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

    return (
        <section style={{
            minHeight: "100vh", background: "#050505",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden", padding: "120px 32px 80px",
        }}>
            {/* Grain texture */}
            <div style={{
                position: "absolute", inset: 0, opacity: 0.035, pointerEvents: "none",
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundSize: "256px",
            }} />

            {/* Radial glow */}
            <div style={{
                position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
                width: 700, height: 700, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* Horizontal line accent */}
            <div style={{
                position: "absolute", top: "50%", left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 70%, transparent 100%)",
                pointerEvents: "none",
            }} />

            <div style={{ position: "relative", textAlign: "center", maxWidth: 850 }}>
                {/* Badge */}
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100,
                    padding: "6px 16px", marginBottom: 40,
                    opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Lancez votre boutique aujourd'hui
                    </span>
                </div>

                {/* Heading */}
                <h1 style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: "clamp(48px, 7vw, 88px)",
                    color: "#fff", lineHeight: 1.05, letterSpacing: "-2px",
                    margin: "0 0 24px",
                    opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                }}>
                    Vendez sans messages.<br />
                    <span style={{ color: "rgba(255,255,255,0.35)" }}>Juste des commandes.</span>
                </h1>

                {/* Sub */}
                <p style={{
                    color: "rgba(255,255,255,0.45)", fontSize: 18, lineHeight: 1.7,
                    maxWidth: 520, margin: "0 auto 52px",
                    opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
                }}>
                    Partagez juste votre lien. Vos clients choisissent, commandent et vous n'avez plus qu'à livrer.
                </p>

                {/* CTAs */}
                <div style={{
                    display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap",
                    opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
                }}>
                    <NavLink to="/inscription" style={{
                        background: "#fff", color: "#000", fontSize: 14, fontWeight: 700,
                        padding: "14px 36px", borderRadius: 8, textDecoration: "none",
                        letterSpacing: "0.02em", transition: "transform 0.2s, box-shadow 0.2s",
                        boxShadow: "0 0 0 0 rgba(255,255,255,0)",
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,255,255,0.15)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                        Créer ma boutique →
                    </NavLink>
                    <a href="#how" style={{
                        background: "transparent", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 500,
                        padding: "14px 28px", borderRadius: 8, textDecoration: "none",
                        border: "1px solid rgba(255,255,255,0.12)", letterSpacing: "0.02em",
                        transition: "border-color 0.2s, color 0.2s",
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}>
                        Voir comment ça marche
                    </a>
                </div>

                {/* Stats */}
                <div style={{
                    display: "flex", gap: 48, justifyContent: "center", marginTop: 72,
                    paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.07)",
                    opacity: mounted ? 1 : 0, transition: "opacity 0.7s ease 0.5s",
                }}>
                    {[
                        ["1min", "Pour créer ta boutique"],
                        ["7j/7", "Support disponible"],
                        ["0€", "Pour commencer"],
                    ].map(([n, l]) => (
                        <div key={l} style={{ textAlign: "center" }}>
                            <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 32, color: "#fff", letterSpacing: "-1px" }}>{n}</div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4, letterSpacing: "0.04em" }}>{l}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                opacity: mounted ? 0.4 : 0, transition: "opacity 0.7s ease 0.8s",
                animation: "bob 2.5s ease-in-out infinite",
            }}>
                <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)" }} />
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
        @keyframes bob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
      `}</style>
        </section>
    );
}

function Features() {
    const { ref, visible } = useIntersection();
    return (
        <section id="features" ref={ref} style={{ background: "#fff", padding: "100px 32px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <div style={{
                    textAlign: "center", marginBottom: 72,
                    opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                }}>
                    <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 16 }}>Fonctionnalités</p>
                    <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", color: "#050505", letterSpacing: "-1.5px", lineHeight: 1.1, margin: 0 }}>
                        Tout ce dont vous avez besoin.<br />
                        <span style={{ color: "#9CA3AF" }}>Rien de superflu.</span>
                    </h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 2 }}>
                    {FEATURES.map((f, i) => (
                        <div key={f.title} style={{
                            padding: "36px 32px", background: i % 2 === 0 ? "#F9FAFB" : "#fff",
                            borderRadius: 0,
                            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
                            transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
                            cursor: "default",
                        }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#F3F4F6")}
                            onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "#F9FAFB" : "#fff")}>
                            <div style={{ fontSize: 22, marginBottom: 16, color: "#050505" }}>{f.icon}</div>
                            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 8, letterSpacing: "-0.3px" }}>{f.title}</h3>
                            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function HowItWorks() {
    const { ref, visible } = useIntersection();
    return (
        <section id="how" ref={ref} style={{ background: "#F9FAFB", padding: "100px 32px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <div style={{
                    textAlign: "center", marginBottom: 80,
                    opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                }}>
                    <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 16 }}>Processus</p>
                    <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", color: "#050505", letterSpacing: "-1.5px", lineHeight: 1.1, margin: 0 }}>
                        Démarrez en 3 étapes
                    </h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {STEPS.map((s, i) => (
                        <div key={s.num} style={{
                            display: "flex", alignItems: "flex-start", gap: 40,
                            padding: "40px 0", borderBottom: i < STEPS.length - 1 ? "1px solid #E5E7EB" : "none",
                            opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-24px)",
                            transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`,
                        }}>
                            <span style={{
                                fontFamily: "'DM Serif Display', Georgia, serif",
                                fontSize: 48, color: "#E5E7EB", lineHeight: 1, flexShrink: 0, letterSpacing: "-2px",
                            }}>{s.num}</span>
                            <div style={{ paddingTop: 8 }}>
                                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#111827", marginBottom: 10, letterSpacing: "-0.4px" }}>{s.title}</h3>
                                <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    const { ref, visible } = useIntersection();
    return (
        <section ref={ref} style={{ background: "#fff", padding: "100px 32px" }}>
            <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
                <div style={{
                    opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                }}>
                    <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 16 }}>
                        Accès anticipé
                    </p>
                    <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", color: "#050505", letterSpacing: "-1.5px", lineHeight: 1.1, margin: "0 0 24px" }}>
                        Sois parmi les premiers
                    </h2>
                    <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.7, margin: "0 0 48px" }}>
                        Crée ta boutique maintenant et fais partie des pionniers.
                    </p>
                    <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
                        {[["Gratuit", "Actuellement"], ["1 min", "pour créer ta boutique"], ["7j/7", "support disponible"]].map(([n, l]) => (
                            <div key={l}>
                                <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 32, color: "#050505", letterSpacing: "-1px" }}>{n}</div>
                                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4, letterSpacing: "0.04em" }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function CTA() {
    const { ref, visible } = useIntersection();
    return (
        <section ref={ref} style={{ background: "#050505", padding: "120px 32px", position: "relative", overflow: "hidden" }}>
            <div style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                width: 600, height: 600, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />
            <div style={{
                maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative",
                opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
            }}>
                <h2 style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: "clamp(36px, 5vw, 64px)", color: "#fff",
                    letterSpacing: "-2px", lineHeight: 1.05, margin: "0 0 24px",
                }}>
                    Prêt à lancer<br />votre boutique ?
                </h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, lineHeight: 1.7, margin: "0 0 48px" }}>
                    Les premières boutiques se lancent maintenant. Rejoins-les et développe ton activité dès aujourd'hui.
                </p>
                <a href="/register" style={{
                    display: "inline-block",
                    background: "#fff", color: "#000", fontSize: 14, fontWeight: 700,
                    padding: "16px 44px", borderRadius: 8, textDecoration: "none",
                    letterSpacing: "0.02em", transition: "transform 0.2s, box-shadow 0.2s",
                }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,255,255,0.15)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                    Commencer gratuitement →
                </a>
                <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, marginTop: 20, letterSpacing: "0.04em" }}>
                    Aucune carte bancaire requise · Gratuit actuellement
                </p>
            </div>
        </section>
    );
}

import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "40px 32px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20, color: "#fff" }}>Kernel</span>
                <div style={{ display: "flex", gap: 32 }}>
                    {[
                        { label: "Confidentialité", href: "/confidentialite" },
                        { label: "CGU", href: "/cgu" },
                        { label: "Contact", href: "mailto:boutiqueebookinfo@gmail.com" },
                    ].map(({ label, href }) =>
                        href.startsWith("mailto") ? (
                            <a key={label} href={href}
                                style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
                                {label}
                            </a>
                        ) : (
                            <Link key={label} to={href}
                                style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
                                {label}
                            </Link>
                        )
                    )}
                </div>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>© 2026 Kernel</span>
            </div>
        </footer>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
    return (
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    );
}