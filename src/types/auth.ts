export interface UserLoginPayload {
  username: string;
  password: string;
}

export interface UserCreatePayload extends UserLoginPayload {
  email: string;
}
