// src/types/User.ts

export interface Address {
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface UserProfile {
  uid: string;

  // names
  firstName: string;
  lastName: string;
  name: string;

  // contact
  email: string;
  phone?: string;

  role: "customer" | "admin";

  // may not exist for new users
  defaultAddress?: Address;

  createdAt: string;
}
