import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { MobileSidebar } from "../MobileSidebar/MobileSidebar";
import { Sidebar } from "../Sidebar/Sidebar";
import { useState } from "react";

export function MainLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div
            className="flex overflow-hidden"
            style={{ height: "100dvh" }} // ← fix bug 2 : dvh au lieu de h-screen
        >
            <Sidebar />
            <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0">
                <Header
                    onMenuClick={() => setMobileOpen(true)}
                    style={{ paddingTop: "env(safe-area-inset-top)" }} // ← fix bug 1
                />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}