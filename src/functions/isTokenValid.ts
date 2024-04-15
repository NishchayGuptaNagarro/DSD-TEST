interface UserToken {
  exp: number;
  [key: string]: string | number | null;
}

export function isTokenValid(user: string) {
  const userToken: UserToken = JSON.parse(user || `{exp:${Date.now() / 1000}`);
  return Date.now() < userToken.exp * 1000;
}
