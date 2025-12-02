import "./DashboardPage.css";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Products</p>
          <h2>--</h2>
        </div>
        <div className="stat-card">
          <p>Total Orders</p>
          <h2>--</h2>
        </div>
        <div className="stat-card">
          <p>Total Customers</p>
          <h2>--</h2>
        </div>
      </div>
    </div>
  );
}
