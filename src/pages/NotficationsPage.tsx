// src/pages/NotificationsPage.tsx
import { useState } from "react";
import { Clock, AlertCircle } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "assignment" | "system" | "message" | "alert";
}

interface NotificationsPageProps {
  role: "student" | "admin";
}

export default function NotificationsPage({ role }: NotificationsPageProps) {
  const [filterRead, setFilterRead] = useState<"all" | "unread" | "read">(
    "all"
  );
  // admin only: filter by type
  const [filterType, setFilterType] = useState<"all" | Notification["type"]>(
    "all"
  );

  const studentNotifications: Notification[] = [
    {
      id: 1,
      title: "Assignment Due",
      message: "Submit your physics report by tomorrow.",
      time: "10 min ago",
      read: false,
      type: "assignment",
    },
    {
      id: 2,
      title: "New Message",
      message: "Prof. Laura replied to your question.",
      time: "1 hour ago",
      read: true,
      type: "message",
    },
    {
      id: 3,
      title: "Grade Posted",
      message: "Your English essay has been graded.",
      time: "Yesterday",
      read: true,
      type: "system",
    },
  ];

  const adminNotifications: Notification[] = [
    {
      id: 101,
      title: "New Student Joined",
      message: "5 new students enrolled in Biology.",
      time: "2 hours ago",
      read: false,
      type: "system",
    },
    {
      id: 102,
      title: "Report Submitted",
      message: "A student flagged a technical issue.",
      time: "Yesterday",
      read: true,
      type: "alert",
    },
    {
      id: 103,
      title: "Schedule Updated",
      message: "Physics class has been moved to Room 204.",
      time: "3 days ago",
      read: false,
      type: "system",
    },
  ];

  const allNotifs =
    role === "student" ? studentNotifications : adminNotifications;

  // 1) filter by read/unread
  let filtered = allNotifs.filter((n) =>
    filterRead === "all" ? true : filterRead === "read" ? n.read : !n.read
  );
  // 2) admin: also filter by type
  if (role === "admin" && filterType !== "all") {
    filtered = filtered.filter((n) => n.type === filterType);
  }

  return (
    <div className="p-6 bg-blue-50 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold text-blue-900">
        {role === "student" ? "My Notifications" : "Admin Notifications"}
      </h1>

      {/* — Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* read/unread */}
        {(["all", "unread", "read"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilterRead(f)}
            className={`capitalize px-3 py-1 rounded-full text-sm ${
              filterRead === f
                ? "bg-[#2A3FA8] text-white"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}

        {/* admin only: type filter */}
        {role === "admin" && (
          <>
            <span className="text-gray-600 text-sm">Type:</span>
            {(["all", "assignment", "system", "alert"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`capitalize px-3 py-1 rounded-full text-sm ${
                  filterType === t
                    ? "bg-[#2A3FA8] text-white"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </>
        )}
      </div>

      {/* — List */}
      <div className="bg-white rounded-xl shadow p-4 space-y-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500">No notifications.</p>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-lg border ${
                n.read ? "bg-white" : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-800">
                  {n.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{n.time}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{n.message}</p>

              {/* admin-only actions */}
              {role === "admin" && n.type === "alert" && (
                <div className="mt-3 flex items-center gap-3">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <button className="text-red-600 text-sm hover:underline">
                    Resolve Alert
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
