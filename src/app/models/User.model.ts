export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string | null;
}

export interface AuthUser {
  user: User;
}

export interface loginData {
  user: { email: string; password: string };
}

export interface NewUser {
  user: { username: string; email: string; password: string };
}

export interface UpdateUserData {
  email?: string;
  bio?: string;
  image?: string;
  username?: string;
  password?: string;
}

export interface UpdateUser {
  user: UpdateUserData;
}
