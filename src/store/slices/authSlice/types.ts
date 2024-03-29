export interface AuthInitialState {
  user: User;
}

export interface User {
  id: string;
  email: string | null;
  is_email_verified: boolean;
  name?: string | null;
}
