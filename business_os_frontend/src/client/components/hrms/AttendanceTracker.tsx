
import React, { useMemo, useState } from "react";

type AttendanceStatus =
  | "Office-in"
  | "Remote-in"
  | "Weekend"
  | "Absent"
  | "Holiday"
  | "Leave";

interface AttendanceRecord {
  id: number;

  date: string;
  day: string;
  fullDate: string;

  checkIn: string;
  checkOut: string;
  workedHours: string;

  status: AttendanceStatus;
}

const attendanceWeeks: AttendanceRecord[][] = [
  [
    {
      id: 1,
      date: "05",
      day: "SUN",
      fullDate: "05 Jan 2025",
      checkIn: "--:--",
      checkOut: "--:--",
      workedHours: "--:--",
      status: "Weekend",
    },
    {
      id: 2,
      date: "06",
      day: "MON",
      fullDate: "06 Jan 2025",
      checkIn: "09:00 AM",
      checkOut: "06:30 PM",
      workedHours: "09:30",
      status: "Office-in",
    },
    {
      id: 3,
      date: "07",
      day: "TUE",
      fullDate: "07 Jan 2025",
      checkIn: "08:50 AM",
      checkOut: "07:00 PM",
      workedHours: "10:10",
      status: "Remote-in",
    },
    {
      id: 4,
      date: "08",
      day: "WED",
      fullDate: "08 Jan 2025",
      checkIn: "00:00",
      checkOut: "00:00",
      workedHours: "00:00",
      status: "Absent",
    },
    {
      id: 5,
      date: "09",
      day: "THU",
      fullDate: "09 Jan 2025",
      checkIn: "09:00 AM",
      checkOut: "06:30 PM",
      workedHours: "09:30",
      status: "Office-in",
    },
    {
      id: 6,
      date: "10",
      day: "FRI",
      fullDate: "10 Jan 2025",
      checkIn: "09:20 AM",
      checkOut: "08:00 PM",
      workedHours: "10:40",
      status: "Remote-in",
    },
    {
      id: 7,
      date: "11",
      day: "SAT",
      fullDate: "11 Jan 2025",
      checkIn: "--:--",
      checkOut: "--:--",
      workedHours: "--:--",
      status: "Weekend",
    },
  ],

  [
    {
      id: 8,
      date: "12",
      day: "SUN",
      fullDate: "12 Jan 2025",
      checkIn: "--:--",
      checkOut: "--:--",
      workedHours: "--:--",
      status: "Weekend",
    },
    {
      id: 9,
      date: "13",
      day: "MON",
      fullDate: "13 Jan 2025",
      checkIn: "09:03 AM",
      checkOut: "06:35 PM",
      workedHours: "09:32",
      status: "Office-in",
    },
    {
      id: 10,
      date: "14",
      day: "TUE",
      fullDate: "14 Jan 2025",
      checkIn: "08:55 AM",
      checkOut: "06:55 PM",
      workedHours: "10:00",
      status: "Remote-in",
    },
    {
      id: 11,
      date: "15",
      day: "WED",
      fullDate: "15 Jan 2025",
      checkIn: "--:--",
      checkOut: "--:--",
      workedHours: "--:--",
      status: "Holiday",
    },
    {
      id: 12,
      date: "16",
      day: "THU",
      fullDate: "16 Jan 2025",
      checkIn: "09:05 AM",
      checkOut: "06:40 PM",
      workedHours: "09:35",
      status: "Office-in",
    },
    {
      id: 13,
      date: "17",
      day: "FRI",
      fullDate: "17 Jan 2025",
      checkIn: "--:--",
      checkOut: "--:--",
      workedHours: "--:--",
      status: "Leave",
    },
    {
      id: 14,
      date: "18",
      day: "SAT",
      fullDate: "18 Jan 2025",
      checkIn: "--:--",
      checkOut: "--:--",
      workedHours: "--:--",
      status: "Weekend",
    },
  ],
];

// const tabs = [
//   "Attendance Summary",
//   "Overtime",
//   "Regularization",
//   "On Duty",
//   "Hourly Permission",
//   "Shift",
//   "Shift Change Request",
// ];

const statusConfig: Record<
  AttendanceStatus,
  {
    line: string;
    badge: string;
    dot: string;
  }
> = {
  "Office-in": {
    line: "bg-emerald-400",
    badge:
      "bg-white border border-gray-300 text-gray-700 shadow-sm",
    dot: "bg-emerald-400",
  },

  "Remote-in": {
    line: "bg-cyan-400",
    badge:
      "bg-white border border-gray-300 text-gray-700 shadow-sm",
    dot: "bg-cyan-400",
  },

  Weekend: {
    line: "bg-yellow-300",
    badge:
      "bg-white border border-yellow-300 text-gray-700 shadow-sm",
    dot: "bg-yellow-400",
  },

  Absent: {
    line: "bg-red-400",
    badge:
      "bg-white border border-gray-300 text-gray-700 shadow-sm",
    dot: "bg-red-400",
  },

  Holiday: {
    line: "bg-violet-400",
    badge:
      "bg-white border border-gray-300 text-gray-700 shadow-sm",
    dot: "bg-violet-400",
  },

  Leave: {
    line: "bg-orange-400",
    badge:
      "bg-white border border-gray-300 text-gray-700 shadow-sm",
    dot: "bg-orange-400",
  },
};

const AttendanceTracker: React.FC = () => {
  const [weekIndex, setWeekIndex] = useState(0);

  const records = useMemo(
    () => attendanceWeeks[weekIndex],
    [weekIndex]
  );

  const weekLabel = useMemo(() => {
    const first = records[0];
    const last = records[records.length - 1];

    return `${first.fullDate} - ${last.fullDate}`;
  }, [records]);

  const previousWeek = () => {
    if (weekIndex > 0) {
      setWeekIndex((prev) => prev - 1);
    }
  };

  const nextWeek = () => {
    if (weekIndex < attendanceWeeks.length - 1) {
      setWeekIndex((prev) => prev + 1);
    }
  };
    return (
    <div className="min-h-screen bg-[#f6f8fb]">
      {/* ============================
            TOP TABS
      ============================ */}

      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-[1500px] overflow-x-auto whitespace-nowrap px-4">
          {/* {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`border-b-2 px-5 py-4 text-sm transition-all ${
                index === 0
                  ? "border-blue-600 font-semibold text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))} */}
        </div>
      </div>

      {/* ============================
              PAGE CONTENT
      ============================ */}

      <div className="mx-auto max-w-[1500px] p-5">

        {/* Toolbar */}

        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Week Navigation */}

            <div className="flex items-center gap-3">

              <button
                onClick={previousWeek}
                disabled={weekIndex === 0}
                className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
              >
                ‹
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-100">
                📅
              </button>

              <button
                onClick={nextWeek}
                disabled={weekIndex === attendanceWeeks.length - 1}
                className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
              >
                ›
              </button>

              <h2 className="ml-2 text-lg font-semibold text-gray-700">
                {weekLabel}
              </h2>

            </div>

            {/* Right Controls */}

            <div className="flex items-center gap-2">

              <button className="flex h-9 w-9 items-center justify-center rounded border border-blue-500 bg-blue-50 text-blue-600">
                ☷
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                ☰
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                🗓
              </button>

              <button className="rounded-l bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Request
              </button>

              <button className="rounded-r bg-blue-700 px-3 py-2 text-white hover:bg-blue-800">
                ▼
              </button>

            </div>

          </div>

        </div>

        {/* ============================
              ATTENDANCE TABLE
        ============================ */}

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">

          {records.map((record) => {

            const style = statusConfig[record.status];

            return (
              <div
                key={record.id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
              >

                <div className="flex min-h-[86px] items-center">

                  {/* Date */}

                  <div className="w-[90px] border-r border-gray-100 text-center">

                    <h2 className="text-3xl font-semibold text-gray-800">
                      {record.date}
                    </h2>

                    <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                      {record.day}
                    </p>

                  </div>

                  {/* Check In */}

                  <div className="w-[140px] px-6 text-center">

                    <span className="text-[15px] font-semibold text-gray-700">
                      {record.checkIn}
                    </span>

                  </div>

                  {/* Timeline */}

                  <div className="flex flex-1 items-center px-2">
                    <div className="relative flex h-10 flex-1 items-center">

                      {/* Left Gray Dot */}
                      <div className="z-10 h-2.5 w-2.5 rounded-full bg-gray-300" />

                      {/* Colored Timeline */}
                      <div className="relative mx-2 flex-1">

                        <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-gray-200" />

                        <div
                          className={`absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 ${style.line}`}
                        />

                        {/* Status Badge */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <span
                            className={`rounded-md px-3 py-1 text-xs font-medium ${style.badge}`}
                          >
                            {record.status}
                          </span>
                        </div>

                      </div>

                      {/* Right Status Dot */}
                      <div
                        className={`z-10 h-2.5 w-2.5 rounded-full ${style.dot}`}
                      />

                      {/* End Gray Dot */}
                      <div className="ml-2 h-2.5 w-2.5 rounded-full bg-gray-300" />

                    </div>

                  </div>

                  {/* Check Out */}

                  <div className="w-[140px] px-6 text-center">

                    <span className="text-[15px] font-semibold text-gray-700">
                      {record.checkOut}
                    </span>

                  </div>

                  {/* Worked Hours */}

                  <div className="w-[130px] px-5 text-center">

                    <div className="text-lg font-semibold text-gray-700">
                      {record.workedHours}
                    </div>

                    <div className="text-sm leading-4 text-gray-500">
                      Hrs Worked
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AttendanceTracker;