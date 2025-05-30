// src/pages/Student/SchedulePage.tsx

import React, { useState, useEffect } from "react";
import { Search, Clock3 } from "lucide-react";
import api from "../../services/api";

interface ScheduleDTO {
  date: string;
  day: string;
  time: string;
  subject: string; 
  room: string;
  doctor: string;
}

const subjectColors: Record<string, string> = {
  "Web Development": "bg-blue-100",
  "Data Structures": "bg-green-100",
  Networking: "bg-yellow-100",
};

export default function SchedulePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("all");
  const [schedule, setSchedule] = useState<ScheduleDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const stored = localStorage.getItem("eduSyncUser");
        if (!stored) throw new Error("You are not logged in.");

        const { id: studentId, token } = JSON.parse(stored);
        if (!studentId || !token) throw new Error("Missing user ID or token.");

        const { data } = await api.get<ScheduleDTO[]>(
          `/api/courseschedule/mine/${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setSchedule(
          data.map((cls) => ({
            ...cls,
            // ensure only the date portion for filtering/display
            date: cls.date.split("T")[0],
          }))
        );
      } catch (err: any) {
        console.error("Schedule fetch error:", err);
        setError(err.message || "Failed to load schedule");
      } finally {
        setLoading(false);
      }
    }

    fetchSchedule();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-600">Loading schedule…</p>;
  }
  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  const filtered = schedule.filter((cls) => {
    const matchesSearch =
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.doctor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesWeek =
      selectedWeek === "all" || cls.date === selectedWeek;

    return matchesWeek && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 bg-blue-50 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-blue-900">
            Semester Schedule
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white border border-gray-300 rounded px-2 py-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search schedule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none px-2 py-1 text-sm bg-transparent"
              />
            </div>
            <select
              className="text-sm border border-gray-300 rounded px-2 py-1"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
            >
              <option value="all">All Dates</option>
              {[...new Set(schedule.map((s) => s.date))].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table for desktop */}
        <div className="bg-white rounded-2xl shadow p-4 border-l-4 border-blue-500 overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-blue-100 text-blue-800 sticky top-0">
              <tr>
                <th className="border px-3 py-2">Date</th>
                <th className="border px-3 py-2">Day</th>
                <th className="border px-3 py-2">Time</th>
                <th className="border px-3 py-2">Subject</th>
                <th className="border px-3 py-2">Room</th>
                <th className="border px-3 py-2">Doctor</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cls, i) => {
                const today = new Date().toDateString();
                const isToday = new Date(cls.date).toDateString() === today;
                const color = subjectColors[cls.subject] || "";

                return (
                  <tr
                    key={i}
                    className={`hover:bg-blue-50 ${color} ${
                      isToday ? "ring-1 ring-blue-300" : ""
                    }`}
                  >
                    <td className="border px-3 py-2">{cls.date}</td>
                    <td className="border px-3 py-2">{cls.day}</td>
                    <td className="border px-3 py-2 flex items-center gap-1">
                      <Clock3 className="w-4 h-4 text-blue-500" />
                      {cls.time}
                    </td>
                    <td className="border px-3 py-2 font-semibold text-blue-800">
                      {cls.subject}
                    </td>
                    <td className="border px-3 py-2">{cls.room}</td>
                    <td className="border px-3 py-2">
                      <a
                        href={`mailto:${cls.doctor}`}
                        className="text-blue-600 hover:underline"
                      >
                        {cls.doctor}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Accordion for mobile */}
        <div className="block md:hidden">
          {filtered.map((cls, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4 mb-4">
              <h2 className="font-bold text-blue-800 text-lg mb-2">
                {cls.subject}
              </h2>
              <p className="text-sm text-gray-600">Date: {cls.date}</p>
              <p className="text-sm text-gray-600">Day: {cls.day}</p>
              <p className="text-sm text-gray-600">
                Time: {cls.time}
              </p>
              <p className="text-sm text-gray-600">Room: {cls.room}</p>
              <p className="text-sm text-gray-600">
                Doctor:{" "}
                <a
                  href={`mailto:${cls.doctor}`}
                  className="text-blue-600 underline"
                >
                  {cls.doctor}
                </a>
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
