import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>

      <nav className="sidebar-nav">
        <NavLink to="/admin" end className="sidebar-link">
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className="sidebar-link">
          Products
        </NavLink>

        <NavLink to="/admin/orders" className="sidebar-link">
          Orders
        </NavLink>

        <NavLink to="/admin/customers" className="sidebar-link">
          Customers
        </NavLink>

        <NavLink to="/admin/settings" className="sidebar-link">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
