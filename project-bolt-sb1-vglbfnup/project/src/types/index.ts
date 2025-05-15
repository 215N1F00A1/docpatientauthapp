export type UserType = 'patient' | 'doctor';

export interface User {
  firstName: string;
  lastName: string;
  profilePicture: string;
  username: string;
  email: string;
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  userType: UserType;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}