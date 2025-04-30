type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

interface ClassSlot {
  time: string;
  subject: string;
  room: string;
  doctor: string;
}

const schedule: Record<Day, ClassSlot[]> = {
  Monday: [
    {
      time: "7:00 AM",
      subject: "MATH 101",
      room: "Rm 215, MB",
      doctor: "Dr. A. Salem",
    },
    {
      time: "9:00 AM",
      subject: "BIOLOGY",
      room: "Rm 214, SB",
      doctor: "Dr. L. Farouk",
    },
    {
      time: "10:00 AM",
      subject: "PHYSICS 101",
      room: "Rm 95, SFH",
      doctor: "Dr. K. Hassan",
    },
  ],
  Tuesday: [
    {
      time: "9:00 AM",
      subject: "ENGLISH 101",
      room: "Rm 100, FLM",
      doctor: "Dr. M. Osman",
    },
  ],
  Wednesday: [
    {
      time: "7:00 AM",
      subject: "MATH 101",
      room: "Rm 215, MB",
      doctor: "Dr. A. Salem",
    },
    {
      time: "9:00 AM",
      subject: "BIOLOGY",
      room: "Rm 214, SB",
      doctor: "Dr. L. Farouk",
    },
    {
      time: "10:00 AM",
      subject: "PHYSICS 101",
      room: "Rm 95, SFH",
      doctor: "Dr. K. Hassan",
    },
  ],
  Thursday: [
    {
      time: "9:00 AM",
      subject: "ENGLISH 101",
      room: "Rm 100, FLM",
      doctor: "Dr. M. Osman",
    },
  ],
  Friday: [
    {
      time: "7:00 AM",
      subject: "MATH 101",
      room: "Rm 215, MB",
      doctor: "Dr. A. Salem",
    },
    {
      time: "9:00 AM",
      subject: "BIOLOGY",
      room: "Rm 214, SB",
      doctor: "Dr. L. Farouk",
    },
    {
      time: "10:00 AM",
      subject: "PHYSICS 101",
      room: "Rm 95, SFH",
      doctor: "Dr. K. Hassan",
    },
  ],
};

export default function Schedule() {
  const days: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
  ];

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-xl shadow w-full">
      <h2 className="text-xl font-bold text-blue-800 mb-4">
        Weekly Class Schedule
      </h2>
      <div className="w-full min-w-[700px]">
        <table className="w-full table-fixed border text-sm">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="border px-2 py-2 w-28">Time</th>
              {days.map((day) => (
                <th key={day} className="border px-2 py-2 w-40">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td className="border px-2 py-2 font-medium text-gray-600 bg-gray-50">
                  {time}
                </td>
                {days.map((day) => {
                  const slot = schedule[day].find(
                    (entry) => entry.time === time
                  );
                  return (
                    <td key={day + time} className="border px-2 py-2">
                      {slot ? (
                        <div className="space-y-1">
                          <p className="font-semibold text-blue-700">
                            {slot.subject}
                          </p>
                          <p className="text-xs text-gray-500">{slot.room}</p>
                          <p className="text-xs text-gray-500 italic">
                            {slot.doctor}
                          </p>
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
