export interface User {
  name: string;
  role: "admin" | "student";
  token: string;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
