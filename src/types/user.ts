export type User = Record<string, unknown> & {
  id: number;
  username: string;
  email: string;
};