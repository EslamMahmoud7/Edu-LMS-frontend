import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

export default function Layout() {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const role = user?.role === "admin" ? "admin" : "student";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass the real role here */}
      <Navbar toggleSidebar={toggleSidebar} role={role} />
      <div className="flex flex-1 relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          ref={sidebarRef}
          role={role}
        />
        <main className="flex-1 bg-gray-50 p-4 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
