import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  MessageSquare,
  Search,
  LogOut,
  Menu,
  AlertCircle,
} from "lucide-react";

interface NavbarProps {
  toggleSidebar: () => void;
  role: "student" | "admin";
}

export default function Navbar({ toggleSidebar, role }: NavbarProps) {
  const navigate = useNavigate();
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const messages = [
    {
      id: 1,
      sender: "Prof. Daniel",
      content: "Reminder: submit your project report.",
      time: "10 min ago",
      read: false,
    },
    {
      id: 2,
      sender: "Alex Kim",
      content: "Hey! Can we discuss the group task?",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 3,
      sender: "System",
      content: "New course materials are uploaded.",
      time: "Yesterday",
      read: true,
    },
  ];

  const notifications = [
    {
      id: 101,
      title: "Assignment Deadline",
      message: "Math assignment due tomorrow.",
      time: "20 min ago",
      read: false,
      type: "assignment",
    },
    {
      id: 102,
      title: "Class Cancelled",
      message: "Physics lecture has been cancelled.",
      time: "2 hrs ago",
      read: true,
      type: "system",
    },
    {
      id: 103,
      title: "Grade Released",
      message: "Your English essay has been graded.",
      time: "Yesterday",
      read: true,
      type: "system",
    },
  ];

  return (
    <div className="relative flex items-center justify-between bg-gray-100 px-4 py-2 shadow-md rounded-2xl">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-[#2A3FA8]"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2"
        >
          <img src="/favicon.ico" alt="EduSync Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-black hidden sm:block">
            EduSync
          </span>
        </button>
      </div>

      {/* Center: Search */}
      <div className="flex items-center bg-white px-4 py-2 rounded-lg border border-gray-300">
        <Search className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search courses, materials..."
          className="ml-2 outline-none bg-transparent text-gray-700 text-sm sm:text-base"
        />
      </div>

      {/* Right: Icons + Profile */}
      <div className="flex items-center gap-4 relative">
        {/* Messages */}
        <div className="relative">
          <MessageSquare
            className="h-6 w-6 text-gray-600 hover:text-green-500 cursor-pointer"
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifications(false);
            }}
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
            {messages.filter((m) => !m.read).length}
          </span>
          {showMessages && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-700">
                  New Messages
                </h4>
              </div>
              <ul className="divide-y max-h-64 overflow-y-auto">
                {messages.map((msg) => (
                  <li
                    key={msg.id}
                    className={`p-4 hover:bg-gray-100 ${
                      msg.read ? "" : "bg-blue-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-800">
                        {msg.sender}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{msg.content}</p>
                  </li>
                ))}
              </ul>
              <div className="text-center text-sm p-2 border-t">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    const path =
                      role === "admin" ? "/admin/community" : "/community";
                    navigate(path);
                    setShowNotifications(false);
                  }}
                >
                  View All Messages →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <Bell
            className="h-6 w-6 text-gray-600 hover:text-yellow-500 cursor-pointer"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
            }}
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
            {notifications.filter((n) => !n.read).length}
          </span>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-700">
                  Notifications
                </h4>
              </div>
              <ul className="divide-y max-h-64 overflow-y-auto">
                {notifications.map((note) => (
                  <li
                    key={note.id}
                    className={`p-4 hover:bg-gray-100 ${
                      note.read ? "" : "bg-blue-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-800">
                        {note.title}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {note.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{note.message}</p>
                    {note.type === "assignment" && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        Action Required
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="text-center text-sm p-2 border-t">
                <button
                  onClick={() => {
                    // route by role
                    const path =
                      role === "admin"
                        ? "/admin/notifications"
                        : "/notifications";
                    navigate(path);
                    setShowNotifications(false);
                  }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View All Notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <LogOut
          className="h-6 w-6 text-gray-600 hover:text-red-500 cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}
