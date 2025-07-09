import React from "react";
import KYCSidebar from "./components/Sidebar";
import ProfileAvatar from "./components/profileAvatar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <KYCSidebar />
        {/* Main Content */}
        <main className="flex-1 lg:ml-0 bg-slate-50">
          <nav className="bg-slate-200 flex justify-end p-3">
            <ProfileAvatar />
          </nav>
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
}
