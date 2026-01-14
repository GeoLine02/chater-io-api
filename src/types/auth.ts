export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface UserCreatePayload extends UserLoginPayload {
  username: string;
}
