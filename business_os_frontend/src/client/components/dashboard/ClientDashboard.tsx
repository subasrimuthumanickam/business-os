import React, { useState, useEffect } from "react";

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
}

interface TopProduct {
  id: string;
  name: string;
  revenue: number;
  quantity: number;
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

interface SalesData {
  month: string;
  revenue: number;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: number;
  changeLabel?: string;
  alert?: boolean;
  alertText?: string;
  type?: "revenue" | "customers" | "products" | "invoices";
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  alert,
  alertText,
  type = "revenue",
}) => {
  let strokeColor = "#4318ff";
  let percentage = 75;

  if (type === "customers") {
    strokeColor = "#05cd99";
    percentage = 62;
  } else if (type === "products") {
    strokeColor = "#ffb547";
    percentage = 85;
  } else if (type === "invoices") {
    strokeColor = "#ee5d50";
    percentage = 40;
  }

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div
      className="
        flex items-center gap-5
        rounded-[20px]
        border border-[rgba(244,247,254,0.8)]
        bg-white
        p-[20px_22px]
        shadow-[0px_18px_40px_rgba(112,144,176,0.05)]
      "
    >
      {/* Left Ring */}
      <div
        className="
          relative
          flex
          h-[60px]
          w-[60px]
          shrink-0
          items-center
          justify-center
        "
      >
        <svg
          viewBox="0 0 64 64"
          className="h-full w-full -rotate-90"
        >
          <circle
            cx="32"
            cy="32"
            r={radius}
            strokeWidth="6"
            fill="none"
            stroke="#f4f7fe"
          />

          <circle
            cx="32"
            cy="32"
            r={radius}
            strokeWidth="6"
            fill="none"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset .4s ease-in-out",
            }}
          />
        </svg>

        <span
          className="
            absolute
            text-[11px]
            font-bold
            text-[#1b2559]
          "
        >
          {percentage}%
        </span>
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-center">
        <span
          className="
            text-[13px]
            font-bold
            uppercase
            tracking-[0.5px]
            text-[#a3aed0]
          "
        >
          {title}
        </span>

        <h2
          className="
            mt-[2px]
            text-[24px]
            font-bold
            leading-none
            tracking-[-0.5px]
            text-[#1b2559]
          "
        >
          {value}
        </h2>

        {change !== undefined && (
          <div
            className="
              mt-[6px]
              flex
              items-center
              gap-[6px]
              text-[12px]
              font-semibold
            "
          >
            <span
              className={
                change >= 0
                  ? "font-bold text-[#05cd99]"
                  : "font-bold text-[#ee5d50]"
              }
            >
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
            </span>

            <span className="font-medium text-[#a3aed0]">
              {changeLabel}
            </span>
          </div>
        )}

        {alert && alertText && (
          <div
            className="
              mt-[6px]
              w-max
              rounded-md
              bg-[#fff9f0]
              px-2
              py-[2px]
              text-[11px]
              font-semibold
              text-[#ffb547]
            "
          >
            ⚠️ {alertText}
          </div>
        )}
      </div>
    </div>
  );
};
// ─────────────────────────────────────────────
// RECENT ACTIVITIES
// ─────────────────────────────────────────────

const ACTIVITY_ICONS: Record<string, string> = {
  customer: "👥",
  invoice: "💰",
  payment: "💳",
  stock: "📦",
  lead: "📋",
};

const formatTime = (ts: string): string => {
  const diff = Date.now() - new Date(ts).getTime();

  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;

  const hrs = Math.floor(mins / 60);

  if (hrs < 24) return `${hrs}h ago`;

  return `${Math.floor(hrs / 24)}d ago`;
};

const RecentActivities: React.FC<{ activities: Activity[] }> = ({
  activities,
}) => (
  <div
    className="
      flex flex-col
      rounded-[20px]
      border border-[rgba(244,247,254,0.7)]
      bg-white
      p-6
      shadow-[0px_18px_40px_rgba(112,144,176,0.06)]
    "
  >
    {/* Header */}
    <div
      className="
        mb-4
        flex
        items-center
        justify-between
        border-b border-[#f4f7fe]
        pb-4
      "
    >
      <h3 className="text-[16px] font-bold text-[#1b2559]">
        Recent Activity
      </h3>

      <button
        className="
          rounded-[10px]
          bg-[#f4f0ff]
          px-[14px]
          py-[6px]
          text-[12px]
          font-bold
          text-[#4318ff]
          transition
          hover:-translate-y-[1px]
          hover:bg-[#e1d8ff]
        "
      >
        View All
      </button>
    </div>

    {/* List */}
    <div className="flex flex-col">
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          className={`flex items-center py-[14px] ${
            index !== activities.length - 1
              ? "border-b border-[#f4f7fe]"
              : ""
          }`}
        >
          <div
            className="
              mr-[14px]
              flex
              h-[38px]
              w-[38px]
              items-center
              justify-center
              rounded-full
              bg-[#f4f7fe]
              text-[15px]
            "
          >
            {ACTIVITY_ICONS[activity.type] ?? "📌"}
          </div>

          <div className="flex-1">
            <div className="text-[14px] font-bold text-[#1b2559]">
              {activity.title}
            </div>

            <div className="mt-[2px] text-[12px] font-medium text-[#a3aed0]">
              {activity.description}
            </div>
          </div>

          <div className="text-[12px] font-semibold text-[#a3aed0]">
            {formatTime(activity.timestamp)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────
// SALES CHART
// ─────────────────────────────────────────────

const DEFAULT_SALES: SalesData[] = [
  { month: "Jan", revenue: 24000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 30000 },
  { month: "Apr", revenue: 27000 },
  { month: "May", revenue: 36000 },
  { month: "Jun", revenue: 33000 },
];

const SalesChart: React.FC<{ data?: SalesData[] }> = ({
  data = DEFAULT_SALES,
}) => {
  const max = Math.max(...data.map((d) => d.revenue));

  return (
    <div
      className="
        flex flex-col
        rounded-[20px]
        border border-[rgba(244,247,254,0.7)]
        bg-white
        p-6
        shadow-[0px_18px_40px_rgba(112,144,176,0.06)]
      "
    >
      {/* Header */}
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
          border-b border-[#f4f7fe]
          pb-4
        "
      >
        <h3 className="text-[16px] font-bold text-[#1b2559]">
          Sales Overview
        </h3>

        <select
          className="
            cursor-pointer
            rounded-[10px]
            bg-[#f4f7fe]
            px-[14px]
            py-[6px]
            text-[12px]
            font-semibold
            text-[#1b2559]
            outline-none
          "
        >
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>

      {/* Chart */}
      <div className="flex h-[220px] items-end justify-between px-[10px] pt-[10px]">
        {data.map((item) => (
          <div
            key={item.month}
            className="flex flex-1 flex-col items-center gap-3"
          >
            <div
              className="
                relative
                flex
                h-[180px]
                w-[14px]
                flex-col
                justify-end
                rounded-full
                bg-[#f4f7fe]
              "
            >
              <span
                className="
                  absolute
                  -top-6
                  left-1/2
                  -translate-x-1/2
                  whitespace-nowrap
                  rounded
                  bg-white
                  px-1
                  py-[2px]
                  text-[10px]
                  font-bold
                  text-[#1b2559]
                  shadow
                "
              >
                ₹{Math.round(item.revenue / 1000)}K
              </span>

              <div
                className="w-full rounded-t-full bg-[#4318ff] transition-all duration-300"
                style={{
                  height: `${Math.round(
                    (item.revenue / max) * 160
                  )}px`,
                }}
                title={`₹${item.revenue.toLocaleString()}`}
              />
            </div>

            <span className="text-[12px] font-semibold text-[#a3aed0]">
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
// ─────────────────────────────────────────────
// TOP PRODUCTS
// ─────────────────────────────────────────────

const TopProducts: React.FC<{ products: TopProduct[] }> = ({ products }) => {
  const maxRevenue = Math.max(...products.map((p) => p.revenue));

  return (
    <div
      className="
        flex flex-col
        rounded-[20px]
        border border-[rgba(244,247,254,0.7)]
        bg-white
        p-6
        shadow-[0px_18px_40px_rgba(112,144,176,0.06)]
      "
    >
      {/* Header */}
      <div
        className="
          mb-4
          flex items-center justify-between
          border-b border-[#f4f7fe]
          pb-4
        "
      >
        <h3 className="text-[16px] font-bold text-[#1b2559]">
          Top Products
        </h3>

        <button
          className="
            rounded-[10px]
            bg-[#f4f0ff]
            px-[14px]
            py-[6px]
            text-[12px]
            font-bold
            text-[#4318ff]
            transition-all
            hover:-translate-y-[1px]
            hover:bg-[#e1d8ff]
          "
        >
          View All
        </button>
      </div>

      {/* Product List */}
      <div className="flex flex-col">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`flex items-center py-[14px] ${
              index !== products.length - 1
                ? "border-b border-[#f4f7fe]"
                : ""
            }`}
          >
            <div className="w-6 text-[14px] font-bold text-[#a3aed0]">
              {index + 1}
            </div>

            <div
              className="
                w-[120px]
                truncate
                text-[14px]
                font-bold
                text-[#1b2559]
              "
            >
              {product.name}
            </div>

            <div
              className="
                mx-4
                h-2
                flex-1
                overflow-hidden
                rounded-full
                bg-[#f4f7fe]
              "
            >
              <div
                className="h-full rounded-full bg-[#4318ff]"
                style={{
                  width: `${Math.round(
                    (product.revenue / maxRevenue) * 100
                  )}%`,
                }}
              />
            </div>

            <div
              className="
                min-w-[70px]
                text-right
                text-[14px]
                font-bold
                text-[#1b2559]
              "
            >
              ₹{product.revenue.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// UPCOMING TASKS
// ─────────────────────────────────────────────

const formatDue = (dueDate: string): string => {
  const diff = new Date(dueDate).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days < 0) return "Overdue";
  if (days === 0) return "Due Today";
  if (days === 1) return "Tomorrow";

  return `${days} days left`;
};

const UpcomingTasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const [done, setDone] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setDone((prev) => {
      const updated = new Set(prev);

      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }

      return updated;
    });
  };

  return (
    <div
      className="
        flex flex-col
        rounded-[20px]
        border border-[rgba(244,247,254,0.7)]
        bg-white
        p-6
        shadow-[0px_18px_40px_rgba(112,144,176,0.06)]
      "
    >
      {/* Header */}
      <div
        className="
          mb-4
          flex items-center justify-between
          border-b border-[#f4f7fe]
          pb-4
        "
      >
        <h3 className="text-[16px] font-bold text-[#1b2559]">
          Upcoming Tasks
        </h3>

        <button
          className="
            rounded-[10px]
            bg-[#f4f0ff]
            px-[14px]
            py-[6px]
            text-[12px]
            font-bold
            text-[#4318ff]
            transition-all
            hover:-translate-y-[1px]
            hover:bg-[#e1d8ff]
          "
        >
          View All
        </button>
      </div>

      {/* Task List */}
      <div className="flex flex-col">
        {tasks.map((task, index) => {
          const due = formatDue(task.dueDate);

          return (
            <div
              key={task.id}
              className={`flex items-center py-[14px] ${
                index !== tasks.length - 1
                  ? "border-b border-[#f4f7fe]"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                checked={done.has(task.id)}
                onChange={() => toggle(task.id)}
                className="
                  mr-[14px]
                  h-[18px]
                  w-[18px]
                  cursor-pointer
                  accent-[#4318ff]
                "
              />

              <div className="flex-1">
                <div
                  className="text-[14px] font-bold text-[#1b2559] transition-all"
                  style={{
                    textDecoration: done.has(task.id)
                      ? "line-through"
                      : "none",
                    opacity: done.has(task.id) ? 0.5 : 1,
                  }}
                >
                  {task.title}
                </div>

                <div
                  className={`mt-[2px] text-[12px] font-semibold ${
                    due === "Due Today" || due === "Overdue"
                      ? "text-[#ee5d50]"
                      : "text-[#a3aed0]"
                  }`}
                >
                  {due}
                </div>
              </div>

              <span
                className={`min-w-[75px] rounded-[8px] px-3 py-1 text-center text-[11px] font-bold uppercase tracking-[0.5px]
                ${
                  task.priority === "high"
                    ? "bg-[#ffebeb] text-[#ee5d50]"
                    : task.priority === "medium"
                    ? "bg-[#fff5e6] text-[#ffb547]"
                    : "bg-[#e6fcf5] text-[#05cd99]"
                }`}
              >
                {task.priority}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
// ─────────────────────────────────────────────
// MAIN CLIENT DASHBOARD
// ─────────────────────────────────────────────

const ClientDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/dashboard'); // your backend port
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);

  if (loading) {
    return (
      <div className="flex min-h-[350px] items-center justify-center text-lg font-semibold text-slate-500">
        Loading Dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[350px] items-center justify-center text-lg font-semibold text-slate-500">
        No data available
      </div>
    );
  }

  const { stats, activities, topProducts, tasks } = data;

  return (
    <div className="space-y-6">

      {/* ================= Header ================= */}

      <div className="mb-7">
        <h1 className="text-[26px] font-bold tracking-[-0.6px] text-[#1b2559]">
          Dashboard
        </h1>

        <p className="mt-1 text-[14px] font-medium text-[#a3aed0]">
          Welcome back! Here's your business overview
        </p>
      </div>

      {/* ================= Stats ================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatsCard
          type="revenue"
          title="Revenue"
          value={`₹${stats.revenue.thisMonth.toLocaleString()}`}
          icon="💰"
          change={stats.revenue.growth}
          changeLabel="vs last month"
        />

        <StatsCard
          type="customers"
          title="Customers"
          value={stats.customers.total}
          icon="👥"
          change={stats.customers.newThisMonth}
          changeLabel="new this month"
        />

        <StatsCard
          type="products"
          title="Products"
          value={stats.products.total}
          icon="📦"
          alert={stats.products.lowStock > 0}
          alertText={`${stats.products.lowStock} items low stock`}
        />

        <StatsCard
          type="invoices"
          title="Invoices"
          value={stats.invoices.total}
          icon="📄"
          change={stats.invoices.pending}
          changeLabel="pending"
        />
      </div>

      {/* ================= Row 1 ================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-2
        "
      >
        <RecentActivities activities={activities} />

        <SalesChart />
      </div>

      {/* ================= Row 2 ================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-2
        "
      >
        <TopProducts products={topProducts} />

        <UpcomingTasks tasks={tasks} />
      </div>

    </div>
  );
};

export default ClientDashboard;