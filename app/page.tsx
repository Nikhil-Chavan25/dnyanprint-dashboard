
"use client";

import {
  Printer,
  LayoutDashboard,
  FileText,
  ClipboardList,
  CheckSquare,
  Users,
  Bell,
  ChartNoAxesColumn,
  Settings,
  Sun,
  Clock3,
  CheckCircle2,
  IndianRupee,
  FileUp,
  Files,
  CalendarDays,
  ChartColumnIncreasing,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Menu,
  X,
  Search,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useState } from "react";

const orders = [
  { id: "DP-4587", student: "Rohit Patil", document: "Assignment.pdf", pages: 12, status: "Printing", time: "10:12 AM" },
  { id: "DP-4586", student: "Sneha Deshmukh", document: "Notes.pdf", pages: 8, status: "Ready", time: "09:58 AM" },
  { id: "DP-4585", student: "Aditya Kulkarni", document: "Project.pdf", pages: 25, status: "Printing", time: "09:45 AM" },
  { id: "DP-4584", student: "Pooja Jadhav", document: "ID Card.jpg", pages: 2, status: "Ready", time: "09:32 AM" },
  { id: "DP-4583", student: "Sanket Shinde", document: "Syllabus.pdf", pages: 15, status: "Pending", time: "09:20 AM" },
];

const notices = [
  { type: "Important", title: "Exam Form Submission Deadline Extended", date: "21 Aug 2025", time: "2:30 PM", icon: Bell, color: "red" },
  { type: "Academic", title: "End Semester Examination Timetable", date: "20 Aug 2025", time: "10:15 AM", icon: FileText, color: "blue" },
  { type: "Event", title: "Dnyanotsav 2026 Registration Started", date: "18 Aug 2025", time: "09:20 AM", icon: CalendarDays, color: "green" },
  { type: "Scholarship", title: "Scholarship Application Notice", date: "16 Aug 2025", time: "11:45 AM", icon: CheckCircle2, color: "purple" },
];

const statusData = [
  { name: "Ready for Pickup", value: 21, color: "#20b77a", percent: "43%" },
  { name: "Printing", value: 14, color: "#f6a623", percent: "29%" },
  { name: "Pending", value: 7, color: "#4e80f5", percent: "15%" },
  { name: "Completed", value: 6, color: "#9160e8", percent: "13%" },
];

const volumeData = [
  { day: "Mon", date: "18 Aug", bw: 13, color: 9 },
  { day: "Tue", date: "19 Aug", bw: 15, color: 13 },
  { day: "Wed", date: "20 Aug", bw: 13, color: 8 },
  { day: "Thu", date: "21 Aug", bw: 13, color: 15 },
  { day: "Fri", date: "22 Aug", bw: 9, color: 7 },
  { day: "Sat", date: "23 Aug", bw: 11, color: 6 },
  { day: "Sun", date: "24 Aug", bw: 9, color: 5 },
];

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "New Orders", icon: FileText, count: "3" },
  { name: "Printing Queue", icon: Printer, count: "7" },
  { name: "Completed", icon: CheckSquare },
  { name: "Students", icon: Users },
  { name: "Notices", icon: ClipboardList },
  { name: "Reports", icon: ChartNoAxesColumn },
  { name: "Settings", icon: Settings },
];

export default function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) =>
    `${order.id} ${order.student} ${order.document} ${order.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-shell">
      {mobileMenu && (
        <button
          className="mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><Printer size={29} strokeWidth={2.5} /></div>
          <div>
            <div className="brand-name">DnyanPrint</div>
            <div className="brand-tagline">Print · Collect · Done</div>
          </div>
          <button className="close-menu" onClick={() => setMobileMenu(false)} aria-label="Close menu">
            <X size={21} />
          </button>
        </div>

        <nav className="navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`nav-item ${activePage === item.name ? "nav-active" : ""}`}
                onClick={() => {
                  setActivePage(item.name);
                  setMobileMenu(false);
                }}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.name}</span>
                {item.count && <span className="nav-count">{item.count}</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-promo">
          <Printer size={31} strokeWidth={1.5} />
          <p>Smarter Printing<br />for a Smoother<br />Campus</p>
          <span className="promo-line" />
        </div>

        <div className="sidebar-profile">
          <div className="avatar">SM</div>
          <div className="profile-info">
            <strong>Store Manager</strong>
            <span>Stationary Manager</span>
          </div>
          <ChevronRight size={17} />
        </div>
      </aside>

      <section className="main-content">
        <header className="top-header">
          <div className="welcome">
            <button className="mobile-menu-button" onClick={() => setMobileMenu(true)} aria-label="Open menu">
              <Menu size={23} />
            </button>
            <span className="sun-icon"><Sun size={26} fill="#ffbb38" color="#ffbb38" /></span>
            <div>
              <p className="greeting">Good Morning,</p>
              <h1>{activePage === "Dashboard" ? "Stationary Manager" : activePage}</h1>
              <p className="welcome-subtitle">
                {activePage === "Dashboard"
                  ? "Here’s what’s happening at your stationery today."
                  : `Manage your ${activePage.toLowerCase()} and keep your campus running smoothly.`}
              </p>
            </div>
          </div>

          <div className="header-right">
            <button className="notification-button" aria-label="Notifications">
              <Bell size={21} />
              <span className="notification-dot">3</span>
            </button>
            <div className="header-date">
              <span>Thu, 21 Aug 2025</span>
              <strong>10:24 AM</strong>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <StatCard icon={<FileText size={24} />} tone="blue" label="Total Orders Today" value="48" trend="↑ 12%" trendTone="up" />
          <StatCard icon={<Clock3 size={25} />} tone="orange" label="Pending for Print" value="7" trend="↓ 30%" trendTone="up" />
          <StatCard icon={<CheckCircle2 size={25} />} tone="green" label="Ready for Pickup" value="21" trend="↑ 18%" trendTone="up" />
          <StatCard icon={<IndianRupee size={25} />} tone="purple" label="Total Revenue (Today)" value="₹ 2,480" trend="↑ 26%" trendTone="up" />
        </section>

        <section className="dashboard-grid">
          <div className="left-column">
            <section className="panel orders-panel">
              <div className="panel-heading">
                <h2>Recent Orders</h2>
                <button className="text-link" onClick={() => setActivePage("New Orders")}>
                  View All <ArrowRight size={15} />
                </button>
              </div>

            

              <div className="orders-table-wrap">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Student</th>
                      <th>Document</th>
                      <th>Pages</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td><span className="order-id">{order.id}</span></td>
                        <td>{order.student}</td>
                        <td>{order.document}</td>
                        <td>{order.pages}</td>
                        <td><span className={`status-pill status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                        <td className="time-cell">{order.time}</td>
                      </tr>
                    ))}
                    {filteredOrders.length === 0 && (
                      <tr><td colSpan={6} className="empty-state">No matching orders found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="panel status-panel">
              <div className="panel-heading">
                <h2>Order Status Overview</h2>
              </div>
              <div className="status-chart-layout">
                <div className="donut-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius="66%"
                        outerRadius="99%"
                        paddingAngle={1}
                        strokeWidth={1}
                        stroke="#fff"
                      >
                        {statusData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="donut-center">
                    <strong>48</strong>
                    <span>Total Orders</span>
                  </div>
                </div>

                <div className="legend-list">
                  {statusData.map((item) => (
                    <div className="legend-row" key={item.name}>
                      <span className="legend-name">
                        <i style={{ background: item.color }} />
                        {item.name}
                      </span>
                      <strong>{item.value}</strong>
                      <span className="legend-percent">{item.percent}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="panel volume-panel">
              <div className="panel-heading">
                <h2>Daily Print Volume</h2>
                <div className="chart-key">
                  <span><i className="key-dot bw-dot" /> B&amp;W</span>
                  <span><i className="key-dot color-dot" /> Color</span>
                </div>
              </div>
              <div className="volume-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData} margin={{ top: 12, right: 8, left: -17, bottom: 0 }} barCategoryGap="38%">
                    <CartesianGrid vertical={false} stroke="#e9edf4" strokeDasharray="0" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 10, fill: "#59677e" }}
                      axisLine={false}
                      tickLine={false}
                      tickMargin={10}
                    />
                    <YAxis
                      domain={[0, 40]}
                      ticks={[0, 10, 20, 30, 40]}
                      tick={{ fontSize: 10, fill: "#7b879c" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Bar dataKey="bw" stackId="a" fill="#284d9f" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="color" stackId="a" fill="#9160e8" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="volume-dates">
                {volumeData.map((item) => (
                  <span key={item.day}>{item.date}</span>
                ))}
              </div>
            </section>
          </div>

          <div className="right-column">
            <section className="panel quick-panel">
              <div className="panel-heading"><h2>Quick Actions</h2></div>
              <div className="quick-grid">
                <QuickAction icon={<FileUp size={23} />} tone="blue" title="Upload Document" subtitle="PDF, Image, Docs" onClick={() => setActivePage("New Orders")} />
                <QuickAction icon={<Files size={23} />} tone="green" title="Manage Queue" subtitle="View & Print" onClick={() => setActivePage("Printing Queue")} />
                <QuickAction icon={<ClipboardList size={23} />} tone="orange" title="View Notices" subtitle="College Updates" onClick={() => setActivePage("Notices")} />
                <QuickAction icon={<ChartColumnIncreasing size={23} />} tone="purple" title="View Reports" subtitle="Sales & Orders" onClick={() => setActivePage("Reports")} />
              </div>
            </section>

            <section className="panel notices-panel">
              <div className="panel-heading">
                <h2>College Notices</h2>
                <button className="text-link" onClick={() => setActivePage("Notices")}>
                  View All <ArrowRight size={15} />
                </button>
              </div>
              <div className="notice-list">
                {notices.map((notice) => {
                  const Icon = notice.icon;
                  return (
                    <button className="notice-item" key={notice.title} onClick={() => setActivePage("Notices")}>
                      <span className={`notice-icon notice-${notice.color}`}><Icon size={19} /></span>
                      <span className="notice-copy">
                        <span className={`notice-type type-${notice.color}`}>{notice.type}</span>
                        <strong>{notice.title}</strong>
                        <span className="notice-date">{notice.date} · {notice.time}</span>
                      </span>
                      <ChevronRight size={16} className="notice-arrow" />
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="promo-card">
              <div className="promo-background-shape" />
              <span className="promo-eyebrow">Fast · Easy · Reliable</span>
              <h2>DnyanPrint</h2>
              <p>Prints for a Better<br />College Experience</p>
              <span className="promo-line" />
              <div className="printer-illustration" aria-hidden="true">
                <div className="plant">❧</div>
                <div className="paper-stack"><i /><i /><i /></div>
                <div className="printer-paper" />
                <div className="printer-machine">
                  <span className="printer-top" />
                  <span className="printer-slot" />
                  <span className="printer-button" />
                  <span className="printer-front-paper" />
                </div>
              </div>
              <p className="promo-quote">“Less Queue. More Learning.”</p>
            </section>
          </div>
        </section>

        <footer className="dashboard-footer">
          DnyanPrint · Campus Printing Management
        </footer>
      </section>
    </main>
  );
}

function StatCard({
  icon,
  tone,
  label,
  value,
  trend,
  trendTone,
}: {
  icon: React.ReactNode;
  tone: string;
  label: string;
  value: string;
  trend: string;
  trendTone: string;
}) {
  return (
    <article className="stat-card">
      <div className={`stat-icon icon-${tone}`}>{icon}</div>
      <p className="stat-label">{label}</p>
      <div className="stat-value-row">
        <strong>{value}</strong>
        <span className={`trend trend-${trendTone}`}><TrendingUp size={13} /> {trend}</span>
      </div>
      <span className="stat-caption">vs. yesterday</span>
    </article>
  );
}

function QuickAction({
  icon,
  tone,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  tone: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button className={`quick-action quick-${tone}`} onClick={onClick}>
      <span className={`quick-icon icon-${tone}`}>{icon}</span>
      <strong>{title}</strong>
      <span>{subtitle}</span>
    </button>
  );
}
