export type ILogingUser = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
  needsPasswordChange: boolean;
};