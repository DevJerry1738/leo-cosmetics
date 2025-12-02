import { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import type { Address, UserProfile } from "../types/User";

// Nigerian States
const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT Abuja",
];

// Nigerian phone number regex
const PHONE_REGEX = /^(?:\+234|0)(7\d|8\d|9\d)\d{8}$/;

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [address, setAddress] = useState<Address>({
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
  });

  /** -------------------------------
   * LOAD PROFILE
   * ------------------------------- */
  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        setLoading(true);
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data() as UserProfile;
          setProfile(data);

          if (data.defaultAddress) {
            setAddress(data.defaultAddress);
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  /** -------------------------------
   * VALIDATION
   * ------------------------------- */
  const validateFields = () => {
    let valid = true;
    const newErrors = { phoneNumber: "" };

    if (!PHONE_REGEX.test(address.phoneNumber)) {
      newErrors.phoneNumber =
        "Enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  /** -------------------------------
   * SAVE ADDRESS
   * ------------------------------- */
  const saveAddress = async () => {
    if (!user) return;

    if (!validateFields()) return;

    try {
      setSaving(true);
      const userRef = doc(db, "users", user.uid);

      await setDoc(
        userRef,
        {
          ...profile,
          defaultAddress: address,
        },
        { merge: true }
      );

      alert("Address saved successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  const hasAddress = Boolean(profile?.defaultAddress);

  return (
    <section className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        {/* USER INFO */}
        <div className="profile-section">
          <p>
            <strong>Name:</strong> {profile?.firstName} {profile?.lastName}
          </p>
          <p>
            <strong>Email:</strong> {profile?.email}
          </p>
        </div>

        <hr />

        <h3>Default Shipping Address</h3>

        {/* --------------------------
            ADDRESS CARD
        -------------------------- */}
        {hasAddress && !showForm && (
          <div className="address-card">
            <p><strong>{address.fullName}</strong></p>
            <p>{address.phoneNumber}</p>
            <p>{address.streetAddress}</p>
            <p>{address.city}, {address.state}</p>
            <p>{address.zipCode}</p>

            <button className="edit-btn" onClick={() => setShowForm(true)}>
              Edit Shipping Details
            </button>
          </div>
        )}

        {/* --------------------------
            NO ADDRESS YET
        -------------------------- */}
        {!hasAddress && !showForm && (
          <>
            <p className="no-address">No shipping details added.</p>
            <button className="add-btn" onClick={() => setShowForm(true)}>
              Add Shipping Details
            </button>
          </>
        )}

        {/* --------------------------
            ADDRESS FORM
        -------------------------- */}
        {showForm && (
          <form className="address-form" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name */}
            <div className="input-row">
              <label>Full Name</label>
              <input
                value={address.fullName}
                onChange={(e) =>
                  setAddress({ ...address, fullName: e.target.value })
                }
                placeholder="John Doe"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="input-row">
              <label>Phone Number</label>
              <input
                value={address.phoneNumber}
                onChange={(e) =>
                  setAddress({ ...address, phoneNumber: e.target.value })
                }
                placeholder="08012345678"
                required
              />
              {errors.phoneNumber && (
                <p className="error-text">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Street Address */}
            <div className="input-row">
              <label>Street Address</label>
              <input
                value={address.streetAddress}
                onChange={(e) =>
                  setAddress({ ...address, streetAddress: e.target.value })
                }
                placeholder="123 Palm Street"
                required
              />
            </div>

            {/* City */}
            <div className="input-row">
              <label>City</label>
              <input
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                required
              />
            </div>

            {/* State */}
            <div className="input-row">
              <label>State</label>
              <select
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                required
                className="state-select"
              >
                <option value="">Select State</option>
                {NIGERIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* ZIP Code (optional) */}
            <div className="input-row">
              <label>ZIP Code (optional)</label>
              <input
                value={address.zipCode}
                onChange={(e) =>
                  setAddress({ ...address, zipCode: e.target.value })
                }
                placeholder="900001"
              />
            </div>

            <button className="save-btn" onClick={saveAddress} disabled={saving}>
              {saving ? "Saving..." : "Save Address"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
