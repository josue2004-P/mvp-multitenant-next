export interface UserState {
  id?: string;
  token?: string;
  profiles?: string[];
  isLoggedIn: boolean;
}