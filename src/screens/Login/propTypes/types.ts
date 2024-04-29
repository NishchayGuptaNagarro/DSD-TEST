export interface LoginApiResponse {
  status_code: number;
  msg: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}
