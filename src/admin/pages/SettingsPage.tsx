import { useAuth } from "../../context/AuthContext";
import "./SettingsPage.css";

export default function SettingsPage() {
  const { profile } = useAuth();

  return (
    <div>
      <h1 className="page-title">Admin Settings</h1>

      <div className="settings-box">
        <p><strong>Name:</strong> {profile?.name}</p>
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Role:</strong> {profile?.role}</p>
      </div>
    </div>
  );
}
