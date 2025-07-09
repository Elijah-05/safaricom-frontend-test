"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaThLarge, FaUserPlus, FaRegListAlt } from "react-icons/fa";

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <FaThLarge />,
    path: "/dashboard",
  },
  {
    id: "onboarding",
    label: "Onboarding",
    icon: <FaUserPlus />,
    path: "/dashboard",
  },
  {
    id: "view",
    label: "View",
    icon: <FaRegListAlt />,
    path: "/dashboard",
  },
];

export default function KYCSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 h-screen z-50 w-64 bg-[#06142e] transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
      `}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col pt-8 pb-4 overflow-y-auto">
          <div className="px-6 pb-2">
            <div className="text-xs font-bold text-white tracking-wider mb-2">
              OP-PARTNER MANAGEMENT
            </div>
            <div className="border-b border-gray-600 mb-2"></div>
          </div>
          <nav className="flex-1 px-2 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-none w-full transition-colors
                ${
                  pathname === item.path
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }
              `}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
