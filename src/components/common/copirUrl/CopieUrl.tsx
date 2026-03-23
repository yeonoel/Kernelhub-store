import { Check, Copy } from "lucide-react";
import { useState } from "react";

// ─── CopyButton ───────────────────────────────────────────────────────────────
export function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors px-2 py-1 rounded-lg hover:bg-gray-100 shrink-0"
        >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copié !" : "Copier"}</span>
        </button>
    );
}