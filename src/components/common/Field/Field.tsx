interface FieldProps {
    label: string;
    error?: string;
    children: React.ReactNode;
    optional?: boolean;
    hint?: string;
    S: { label: React.CSSProperties; error: React.CSSProperties };
}

export function Field({ label, error, children, optional, hint, S }: FieldProps) {
    return (
        <div style={{ marginBottom: 18 }}>
            <label style={S.label}>
                {label}
                {optional && <span style={{ color: "#9CA3AF", fontWeight: 400, marginLeft: 6 }}>(optionnel)</span>}
            </label>
            {children}
            {hint && !error && <span style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4, display: "block" }}>{hint}</span>}
            {error && <span style={S.error}>{error}</span>}
        </div>
    );
}