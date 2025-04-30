import { forwardRef, useEffect, useState, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  User,
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  CreditCard,
  Users,
  Settings,
  FileQuestion,
  ClipboardList,
  BarChart2,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { JSX } from "react/jsx-runtime";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role: "admin" | "student";
}

interface MenuItem {
  label: string;
  path?: string;
  icon: JSX.Element;
  children?: MenuItem[];
}

const adminMenu: MenuItem[] = [
  { label: "Profile", path: "/admin/profile", icon: <User size={18} /> },
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Students",
    path: "/admin/students",
    icon: <Users size={18} />,
  },
  {
    label: "Courses",
    path: "/admin/courses",
    icon: <BookOpen size={18} />,
  },
  {
    label: "Assignments",
    path: "/admin/assignments",
    icon: <ClipboardList size={18} />,
  },
  {
    label: "Quizzes",
    path: "/admin/quizzes",
    icon: <FileQuestion size={18} />,
  },
  {
    label: "Payment",
    path: "/admin/payment",
    icon: <CreditCard size={18} />,
  },
  {
    label: "Academic Records",
    path: "/admin/academicRecords",
    icon: <BarChart2 size={18} />,
  },
  { label: "Community", path: "/admin/community", icon: <Users size={18} /> },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: <Settings size={18} />,
  },
];

const studentMenu: MenuItem[] = [
  { label: "Profile", path: "/profile", icon: <User size={18} /> },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  { label: "Courses", path: "/courses", icon: <BookOpen size={18} /> },
  { label: "Schedule", path: "/schedule", icon: <CalendarDays size={18} /> },
  { label: "Quizzes", path: "/quizzes", icon: <FileQuestion size={18} /> },
  {
    label: "Assignments",
    path: "/assignments",
    icon: <ClipboardList size={18} />,
  },
  {
    label: "Academic Records",
    path: "/academicRecords",
    icon: <BarChart2 size={18} />,
  },
  { label: "Payment", path: "/payment", icon: <CreditCard size={18} /> },
  { label: "Community", path: "/community", icon: <Users size={18} /> },
  { label: "Settings", path: "/settings", icon: <Settings size={18} /> },
];

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ isOpen, onClose, role }, ref) => {
    const location = useLocation();
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (label: string) => {
      setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const isGroupActive = useCallback(
      (group: MenuItem) =>
        group.children?.some((child) =>
          location.pathname.startsWith(child.path || "")
        ),
      [location.pathname]
    );

    useEffect(() => {
      const expanded: Record<string, boolean> = {};
      const menu = role === "admin" ? adminMenu : studentMenu;

      menu.forEach((item) => {
        if (item.children && isGroupActive(item)) {
          expanded[item.label] = true;
        }
      });

      setOpenGroups((prev) => ({ ...prev, ...expanded }));
    }, [isGroupActive, location.pathname, role]);

    const menuItems = role === "admin" ? adminMenu : studentMenu;

    return (
      <>
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={onClose}
        />

        <div
          ref={ref}
          className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-5 z-50 transform transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <img src="/favicon.ico" alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-[#2A3FA8]">EduSync</span>
            </div>
            <X
              onClick={onClose}
              className="h-5 w-5 cursor-pointer text-gray-500 hover:text-red-500"
            />
          </div>

          <ul className="space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto pr-1">
            {menuItems.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    onClick={() => toggleGroup(item.label)}
                    className={`w-full flex items-center justify-between p-2 rounded transition ${
                      isGroupActive(item)
                        ? "bg-[#2A3FA8]/10 text-[#2A3FA8] font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </span>
                    {openGroups[item.label] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                  {openGroups[item.label] && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.children.map((sub) => (
                        <li key={sub.label}>
                          <NavLink
                            to={sub.path!}
                            onClick={onClose}
                            className={() =>
                              `flex items-center gap-2 p-2 text-sm rounded transition ${
                                location.pathname === sub.path
                                  ? "bg-[#2A3FA8] text-white shadow font-semibold"
                                  : "text-gray-700 hover:bg-[#2A3FA8]/10 hover:text-[#2A3FA8]"
                              }`
                            }
                          >
                            {sub.icon}
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink
                    to={item.path!}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 rounded transition ${
                        isActive
                          ? "bg-[#2A3FA8] text-white shadow font-semibold"
                          : "text-gray-700 hover:bg-[#2A3FA8]/10 hover:text-[#2A3FA8]"
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";
export default Sidebar;
